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

// ✅ CORS Configuration (fixed)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://sateesh-kumar-website.vercel.app',
  'https://dashboard-nine-ashy-79.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow Postman / server-to-server requests
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error(`❌ Blocked by CORS: ${origin}`);
        return callback(
          new Error('The CORS policy for this site does not allow access from the specified Origin.'),
          false
        );
      }
    },
    credentials: true, // allow cookies, authorization headers, etc.
  })
);

// Middleware
app.use(express.json());
app.use(express.static('uploads'));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/awards', awardsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/cloudinary', signatureRoute);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
