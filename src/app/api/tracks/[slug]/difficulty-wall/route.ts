import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LapRecord from '@/lib/models/LapRecord';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const kartType = searchParams.get('kartType');

    // Build match stage for aggregation
    const matchStage: any = { trackSlug: params.slug };

    if (kartType) {
      matchStage.kartType = kartType;
    }

    // Aggregate lap records by integer second buckets
    const distribution = await LapRecord.aggregate([
      { $match: matchStage },
      {
        $project: {
          timeInSeconds: { $floor: '$bestTime' },
        },
      },
      {
        $group: {
          _id: '$timeInSeconds',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    if (!distribution || distribution.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No data found for this track/kart type',
      }, { status: 404 });
    }

    // Format response
    const difficultyWall = distribution.map((item: any) => ({
      timeInSeconds: item._id,
      count: item.count,
    }));

    const response = {
      success: true,
      trackSlug: params.slug,
      kartType: kartType,
      difficultyWall,
      totalBuckets: difficultyWall.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching difficulty wall:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch difficulty wall data',
      },
      { status: 500 }
    );
  }
}
