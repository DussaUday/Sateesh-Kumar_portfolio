// routes/admin.js
const express = require('express')
const multer = require('multer')
const router = express.Router()
const Gallery = require('../models/Gallery')

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

// Upload image
router.post('/upload', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files
    const galleryItems = files.map(file => ({
      title: req.body.title || file.originalname,
      description: req.body.description || '',
      category: req.body.category || 'general',
      imageUrl: `/uploads/${file.filename}`,
      date: new Date()
    }))

    const savedItems = await Gallery.insertMany(galleryItems)
    res.json(savedItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all gallery items
router.get('/gallery', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ date: -1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete gallery item
router.delete('/gallery/:id', async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ message: 'Image deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update dynamic content
router.post('/content', async (req, res) => {
  try {
    // Save to database or file system
    const content = req.body
    // Implement your content storage logic here
    res.json({ message: 'Content updated successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router