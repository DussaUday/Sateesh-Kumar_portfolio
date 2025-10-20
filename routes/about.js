import express from 'express';
import { About } from '../models/About.js';

const router = express.Router();

// Get about data
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default about document if none exists
      about = new About({
        title: 'Puttagunta Venkata Sateesh Kumar',
        position: 'National Trustee of VHP, Vishwa Hindu Parishad',
        sectionTitle: 'About Me',
        bio: `Puttagunta Venkata Sateesh Kumar is a prominent figure in Andhra Pradesh, India, known for his work as a successful business entrepreneur and his extensive involvement in social service, politics, and the film industry.`,
        image: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1759494949/i2jylorcgognnefbh3vq.jpg',
        imageAspectRatio: '3/4',
        badges: [
          {
            title: 'National Trustee: Vishwa Hindu Parishad',
            icon: 'Award',
            position: 'top-right',
            color: 'from-amber-500 to-yellow-600'
          },
          {
            title: 'Since 1994',
            icon: 'Briefcase',
            position: 'bottom-left',
            color: 'from-rose-500 to-maroon-700'
          }
        ]
      });
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update about data
router.put('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      // Update only allowed fields
      const allowedUpdates = [
        'title', 'position', 'sectionTitle', 'bio', 'image', 
        'imageAspectRatio', 'badges'
      ];
      
      allowedUpdates.forEach(field => {
        if (req.body[field] !== undefined) {
          about[field] = req.body[field];
        }
      });
    }
    
    await about.save();
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update specific fields (for image upload)
router.patch('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }

    const allowedUpdates = [
      'title', 'position', 'sectionTitle', 'bio', 'image', 
      'imageAspectRatio', 'badges'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        about[field] = req.body[field];
      }
    });

    await about.save();
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Manage badges
router.post('/badges', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }

    const newBadge = {
      title: req.body.title,
      icon: req.body.icon || 'Award',
      position: req.body.position || 'top-right',
      color: req.body.color || 'from-amber-500 to-yellow-600'
    };

    about.badges.push(newBadge);
    await about.save();
    
    res.status(201).json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a specific badge
router.put('/badges/:badgeId', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }

    const badgeIndex = about.badges.findIndex(
      badge => badge._id.toString() === req.params.badgeId
    );

    if (badgeIndex === -1) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    about.badges[badgeIndex] = {
      ...about.badges[badgeIndex].toObject(),
      ...req.body
    };

    await about.save();
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a badge
router.delete('/badges/:badgeId', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }

    about.badges = about.badges.filter(
      badge => badge._id.toString() !== req.params.badgeId
    );

    await about.save();
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Clear all data (reset to default)
router.delete('/reset', async (req, res) => {
  try {
    await About.deleteOne({});
    res.json({ message: 'About data reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;