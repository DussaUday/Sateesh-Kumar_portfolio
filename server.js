import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import adminRoutes from './routes/adminlogin.js';
import galleryRoutes from './routes/gallery.js';
import awardsRoutes from './routes/awards.js';
import servicesRoutes from './routes/services.js';
import aboutRoutes from './routes/about.js';
import heroRoutes from './routes/hero.js';
import signatureRoute from "./cloudinarySignature.js";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',  // React dev server
  'https://sateesh-kumar-website.vercel.app/',
  'http://localhost:5173',
  'https://dashboard-nine-ashy-79.vercel.app/',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (e.g., Postman, mobile apps)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow cookies and auth headers
}));

// Middleware
app.use(express.json());
app.use(express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/awards', awardsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/hero', heroRoutes);
app.use("/api/cloudinary", signatureRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
