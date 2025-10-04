import mongoose from 'mongoose';

const serviceImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true }
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  stats: { type: String, required: true },
  gradient: { type: String, required: true },
  features: [String],
  images: [serviceImageSchema],
  mainImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Service', serviceSchema);