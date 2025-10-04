import mongoose from 'mongoose';

const aboutSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [String],
  image: { type: String }, // Cloudinary URL
  createdAt: { type: Date, default: Date.now }
});

const timelineSchema = new mongoose.Schema({
  year: { type: String, required: true },
  event: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const AboutSection = mongoose.model('AboutSection', aboutSectionSchema);
export const Timeline = mongoose.model('Timeline', timelineSchema);