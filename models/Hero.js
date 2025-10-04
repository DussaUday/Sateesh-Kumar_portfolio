import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL for background
  stats: [{
    number: String,
    text: String,
    icon: String
  }],
  ctaText: { type: String, default: 'Explore Journey' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Hero', heroSchema);