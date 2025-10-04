import express from 'express';
import Hero from '../models/Hero.js';

const router = express.Router();

// Get hero data
router.get('/', async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    if (!hero) {
      return res.status(404).json({ message: 'Hero data not found' });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update hero data
router.put('/', async (req, res) => {
  try {
    let hero = await Hero.findOne().sort({ createdAt: -1 });
    
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, {
        ...req.body,
        updatedAt: new Date()
      }, { new: true });
    } else {
      hero = new Hero(req.body);
      await hero.save();
    }
    
    res.json(hero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;