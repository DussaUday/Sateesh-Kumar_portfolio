import mongoose from 'mongoose';

const awardImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true }
});

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, default: '' }, // Added organization field
  description: { type: String, default: '' },
  year: { type: Number, required: true }, // Changed to Number type
  category: { type: String, default: 'social-work' }, // Made category optional with default
  icon: { type: String, default: 'Award' }, // Made icon optional
  gradient: { type: String, default: 'from-blue-500 to-cyan-500' }, // Made gradient optional
  achievements: { type: [String], default: [] }, // Made achievements optional
  images: { type: [awardImageSchema], default: [] }, // Made images optional
  mainImage: { type: String, default: '' }, // Made mainImage optional
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Award', awardSchema);