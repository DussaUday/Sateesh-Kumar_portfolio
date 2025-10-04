import express from 'express';
import { AboutSection, Timeline } from '../models/About.js';

const router = express.Router();

// About sections
router.get('/sections', async (req, res) => {
  try {
    const sections = await AboutSection.find().sort({ createdAt: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/sections', async (req, res) => {
  try {
    const section = new AboutSection(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/sections/:id', async (req, res) => {
  try {
    const section = await AboutSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Timeline
router.get('/timeline', async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ year: 1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/timeline', async (req, res) => {
  try {
    const timelineItem = new Timeline(req.body);
    await timelineItem.save();
    res.status(201).json(timelineItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;