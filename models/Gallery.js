import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true }, // Cloudinary URL
  category: { 
    type: String, 
    required: true,
    enum: ['profile', 'personal', 'health-camps', 'veterinary-camps', 'water-project', 'education', 'awards', 'events', 'lionism', 'projects', 'political', 'general']
  },
  relatedTo: { 
    type: String, 
    enum: ['service', 'award', 'about', 'general'],
    default: 'general'
  },
  relatedId: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Gallery', gallerySchema);