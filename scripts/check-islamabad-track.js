require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  name: String,
  slug: String,
  location: String,
  description: String,
  logo: String,
  kartTypes: [String],
  stats: Object,
}, { timestamps: true });

const Track = mongoose.models.Track || mongoose.model('Track', trackSchema);

const lapRecordSchema = new mongoose.Schema({
  trackSlug: String,
  driverName: String,
  driverSlug: String,
  kartType: String,
  bestTime: Number,
  bestTimeStr: String,
  position: Number,
  tier: String,
  gapToP1: Number,
  interval: Number,
  percentile: Number,
  date: Date,
}, { timestamps: true });

const LapRecord = mongoose.models.LapRecord || mongoose.model('LapRecord', lapRecordSchema);

async function checkIslamabadTrack() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Please add your MongoDB URI to .env.local');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Find the Islamabad track
    const track = await Track.findOne({ slug: '2f2f-formula-karting-islamabad' });

    if (!track) {
      console.log('❌ 2f2f-formula-karting-islamabad track NOT found in database');
      console.log('\nYou need to add this track to MongoDB first.');
    } else {
      console.log('✅ Track found in database:');
      console.log(`   Name: ${track.name}`);
      console.log(`   Slug: ${track.slug}`);
      console.log(`   Location: ${track.location}`);
      console.log(`   Kart Types: ${track.kartTypes ? track.kartTypes.join(', ') : 'None'}`);
      console.log(`   Total Drivers: ${track.stats?.totalDrivers || 0}`);

      // Count records for this track
      const recordCount = await LapRecord.countDocuments({ trackSlug: '2f2f-formula-karting-islamabad' });
      console.log(`\n📊 Lap Records: ${recordCount}`);

      if (recordCount > 0) {
        const sr5Count = await LapRecord.countDocuments({
          trackSlug: '2f2f-formula-karting-islamabad',
          kartType: 'SR5'
        });
        console.log(`   SR5 records: ${sr5Count}`);

        // Show top 5 records
        console.log('\n🏆 Top 5 Records:');
        const topRecords = await LapRecord.find({ trackSlug: '2f2f-formula-karting-islamabad' })
          .sort({ bestTime: 1 })
          .limit(5)
          .lean();

        topRecords.forEach((record, index) => {
          console.log(`   ${index + 1}. ${record.driverName} - ${record.bestTimeStr} (${record.kartType || 'N/A'})`);
        });
      }
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error checking Islamabad track:', error);
    process.exit(1);
  }
}

checkIslamabadTrack();
