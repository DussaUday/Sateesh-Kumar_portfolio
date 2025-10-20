import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  icon: { 
    type: String, 
    enum: ['Award', 'Briefcase', 'Users', 'Building', 'HeartHandshake'],
    default: 'Award'
  },
  position: {
    type: String,
    enum: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    default: 'top-right'
  },
  color: {
    type: String,
    default: 'from-amber-500 to-yellow-600'
  }
}, { _id: true });

const aboutSchema = new mongoose.Schema({
  // Basic Information
  title: { 
    type: String, 
    required: true,
    trim: true,
    default: 'Puttagunta Venkata Sateesh Kumar'
  },
  position: { 
    type: String, 
    required: true,
    trim: true,
    default: 'National Trustee of VHP, Vishwa Hindu Parishad'
  },
  
  // Section Configuration
  sectionTitle: {
    type: String,
    trim: true,
    default: 'About Me'
  },
  
  // Photo & Bio
  image: { 
    type: String,
    default: '',
    trim: true
  },
  bio: { 
    type: String,
    required: true,
    default: ''
  },
  
  // Image Settings
  imageAspectRatio: {
    type: String,
    enum: ['1/1', '3/4', '4/3', '16/9'],
    default: '3/4'
  },
  
  // Photo Tags & Badges
  badges: [badgeSchema],
  
  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
aboutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
aboutSchema.index({ createdAt: -1 });
aboutSchema.index({ updatedAt: -1 });

export const About = mongoose.model('About', aboutSchema);