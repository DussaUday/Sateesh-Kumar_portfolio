import express from 'express';
import Award from '../models/Award.js';

const router = express.Router();

// Get all awards
router.get('/', async (req, res) => {
  try {
    const awards = await Award.find().sort({ year: -1 });
    res.json(awards);
  } catch (error) {
    console.error('Error fetching awards:', error);
    res.status(500).json({ message: 'Failed to fetch awards', error: error.message });
  }
});

// Create award
router.post('/', async (req, res) => {
  try {
    console.log('Creating award with data:', req.body);
    
    // Validate required fields
    if (!req.body.title || !req.body.year) {
      return res.status(400).json({ 
        message: 'Title and year are required fields' 
      });
    }

    // Create award with default values for optional fields
    const awardData = {
      title: req.body.title,
      organization: req.body.organization || '',
      description: req.body.description || '',
      year: parseInt(req.body.year) || new Date().getFullYear(),
      category: req.body.category || 'social-work',
      icon: req.body.icon || 'Award',
      gradient: req.body.gradient || 'from-blue-500 to-cyan-500',
      achievements: req.body.achievements || [],
      images: req.body.images || [],
      mainImage: req.body.mainImage || ''
    };

    const award = new Award(awardData);
    await award.save();
    
    console.log('Award created successfully:', award);
    res.status(201).json(award);
  } catch (error) {
    console.error('Error creating award:', error);
    res.status(400).json({ 
      message: 'Failed to create award', 
      error: error.message 
    });
  }
});

// Update award
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating award:', req.params.id, 'with data:', req.body);
    
    const award = await Award.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    
    res.json(award);
  } catch (error) {
    console.error('Error updating award:', error);
    res.status(400).json({ 
      message: 'Failed to update award', 
      error: error.message 
    });
  }
});

// Delete award
router.delete('/:id', async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id);
    
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    
    res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    console.error('Error deleting award:', error);
    res.status(500).json({ 
      message: 'Failed to delete award', 
      error: error.message 
    });
  }
});

// Get single award by ID
router.get('/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    
    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }
    
    res.json(award);
  } catch (error) {
    console.error('Error fetching award:', error);
    res.status(500).json({ 
      message: 'Failed to fetch award', 
      error: error.message 
    });
  }
});

export default router;