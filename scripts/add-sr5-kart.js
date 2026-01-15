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

async function addSR5Kart() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Please add your MongoDB URI to .env.local');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the 2f2f track
    const track = await Track.findOne({ slug: '2f2f-formula-karting' });

    if (!track) {
      console.log('2f2f-formula-karting track not found');
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log('Current kartTypes:', track.kartTypes);

    // Add SR5 if not already present
    if (!track.kartTypes || !track.kartTypes.includes('SR5')) {
      const result = await Track.updateOne(
        { slug: '2f2f-formula-karting' },
        { $addToSet: { kartTypes: 'SR5' } }
      );
      console.log('Added SR5 to kartTypes:', result.modifiedCount > 0 ? 'Success' : 'Already exists');
    } else {
      console.log('SR5 already exists in kartTypes');
    }

    // Verify the update
    const updatedTrack = await Track.findOne({ slug: '2f2f-formula-karting' });
    console.log('Updated kartTypes:', updatedTrack.kartTypes);

    console.log('\nSR5 kart type update complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error adding SR5 kart:', error);
    process.exit(1);
  }
}

addSR5Kart();
