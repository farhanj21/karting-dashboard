require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

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

async function checkSR5Records() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Please add your MongoDB URI to .env.local');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Count total records for 2f2f
    const totalRecords = await LapRecord.countDocuments({ trackSlug: '2f2f-formula-karting' });
    console.log(`Total records for 2f2f-formula-karting: ${totalRecords}`);

    // Count RX8 records
    const rx8Count = await LapRecord.countDocuments({
      trackSlug: '2f2f-formula-karting',
      kartType: 'RX8'
    });
    console.log(`RX8 records: ${rx8Count}`);

    // Count SR5 records
    const sr5Count = await LapRecord.countDocuments({
      trackSlug: '2f2f-formula-karting',
      kartType: 'SR5'
    });
    console.log(`SR5 records: ${sr5Count}`);

    // Count records with no kartType
    const noKartType = await LapRecord.countDocuments({
      trackSlug: '2f2f-formula-karting',
      kartType: { $exists: false }
    });
    console.log(`Records with no kartType: ${noKartType}`);

    // Show some SR5 records if they exist
    if (sr5Count > 0) {
      console.log('\n--- Sample SR5 Records ---');
      const sr5Records = await LapRecord.find({
        trackSlug: '2f2f-formula-karting',
        kartType: 'SR5'
      })
      .sort({ bestTime: 1 })
      .limit(10)
      .lean();

      sr5Records.forEach((record, index) => {
        console.log(`${index + 1}. ${record.driverName} - ${record.bestTimeStr} (${record.tier})`);
      });
    } else {
      console.log('\nNo SR5 records found.');
    }

    // Show some RX8 records for comparison
    if (rx8Count > 0) {
      console.log('\n--- Sample RX8 Records ---');
      const rx8Records = await LapRecord.find({
        trackSlug: '2f2f-formula-karting',
        kartType: 'RX8'
      })
      .sort({ bestTime: 1 })
      .limit(10)
      .lean();

      rx8Records.forEach((record, index) => {
        console.log(`${index + 1}. ${record.driverName} - ${record.bestTimeStr} (${record.tier})`);
      });
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error checking SR5 records:', error);
    process.exit(1);
  }
}

checkSR5Records();
