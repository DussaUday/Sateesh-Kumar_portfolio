import express from 'express';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Get all gallery items with filtering
router.get('/', async (req, res) => {
  try {
    const { category, limit, relatedTo } = req.query;
    let query = {};
    
    if (category && category !== 'all') query.category = category;
    if (relatedTo) query.relatedTo = relatedTo;
    
    let galleryQuery = Gallery.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      galleryQuery = galleryQuery.limit(parseInt(limit));
    }
    
    const items = await galleryQuery;
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create gallery item
router.post('/', async (req, res) => {
  try {
    const item = new Gallery({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image, // Cloudinary URL
      category: req.body.category,
      relatedTo: req.body.relatedTo,
      relatedId: req.body.relatedId
    });
    
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update gallery item
router.put('/:id', async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete gallery item
router.delete('/:id', async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;