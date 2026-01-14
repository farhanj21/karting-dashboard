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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const tier = searchParams.get('tier') || '';
    const kartType = searchParams.get('kartType') || '';
    const sort = searchParams.get('sort') || 'position';

    // Build query
    const query: any = { trackSlug: params.slug };

    if (search) {
      query.driverName = { $regex: search, $options: 'i' };
    }

    if (tier) {
      query.tier = tier;
    }

    if (kartType) {
      query.kartType = kartType;
    }

    // Build sort - use bestTime when filtering to ensure correct order
    let sortQuery: any = {};
    const hasFilters = kartType || tier || search;

    switch (sort) {
      case 'position':
        sortQuery = hasFilters ? { bestTime: 1 } : { position: 1 };
        break;
      case 'time':
        sortQuery = { bestTime: 1 };
        break;
      case 'tier':
        sortQuery = hasFilters ? { tier: 1, bestTime: 1 } : { tier: 1, position: 1 };
        break;
      default:
        sortQuery = hasFilters ? { bestTime: 1 } : { position: 1 };
    }

    // Calculate skip
    const skip = (page - 1) * limit;

    // Fetch records with pagination
    const [records, total] = await Promise.all([
      LapRecord.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
      LapRecord.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    // If filtering by kartType, tier, or search, recalculate positions, gaps, and intervals
    if (kartType || tier || search) {
      // Get the first record (P1) for gap calculation
      const p1Record = await LapRecord.findOne(query)
        .sort({ bestTime: 1 })
        .lean();

      if (p1Record) {
        const p1Time = p1Record.bestTime;

        // Recalculate positions, gaps, and intervals
        for (let i = 0; i < records.length; i++) {
          const record = records[i];

          // Recalculate position (skip + i + 1)
          record.position = skip + i + 1;

          // Recalculate gap to P1
          record.gapToP1 = record.bestTime - p1Time;

          // Recalculate interval
          if (i === 0 && skip === 0) {
            // First record overall
            record.interval = 0;
          } else if (i === 0 && skip > 0) {
            // First record on this page but not overall - need previous record
            const prevRecord = await LapRecord.findOne(query)
              .sort({ bestTime: 1 })
              .skip(skip - 1)
              .limit(1)
              .lean();

            record.interval = prevRecord ? record.bestTime - prevRecord.bestTime : 0;
          } else {
            // Calculate interval from previous record in the list
            record.interval = record.bestTime - records[i - 1].bestTime;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      records,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leaderboard',
      },
      { status: 500 }
    );
  }
}
