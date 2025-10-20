import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});