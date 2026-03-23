const express = require('express');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
const Generation = require('../models/Generation');
const { generateContent } = require('../services/aiService');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productName, description, brandVoice, audience, platform, includeReel } = req.body;

    console.log('⚡ Generate request:', productName);

    if (!productName || !productName.trim()) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
      return res.status(500).json({ error: 'API key not set. Add ANTHROPIC_API_KEY to server/.env' });
    }

    let imageBase64 = null;
    let imageMimeType = null;
    if (req.file) {
      imageBase64 = req.file.buffer.toString('base64');
      imageMimeType = req.file.mimetype;
    }

    // Generate AI content
    const outputs = await generateContent({
      productName: productName.trim(),
      description: description || '',
      brandVoice: brandVoice || 'Gen Z',
      audience: audience || 'Young Adults',
      platform: platform || 'All Platforms',
      includeReel: includeReel === 'true' || includeReel === true,
      imageBase64,
      imageMimeType,
    });

    console.log('✅ Content generated successfully');

    // Only save to MongoDB if connected
    let savedId = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const generation = new Generation({
          productName: productName.trim(),
          description, brandVoice, audience, platform,
          includeReel: includeReel === 'true' || includeReel === true,
          hasImage: !!req.file,
          outputs,
        });
        await generation.save();
        savedId = generation._id;
        console.log('✅ Saved to MongoDB');
      } catch (dbErr) {
        console.log('⚠️  MongoDB save failed:', dbErr.message);
      }
    } else {
      console.log('⚠️  MongoDB not connected — skipping save');
    }

    // Always return the generated content even if MongoDB failed
    res.json({ success: true, outputs, id: savedId });

  } catch (err) {
    console.error('❌ Route error:', err.message);
    res.status(500).json({ error: err.message || 'Generation failed. Please try again.' });
  }
});

router.get('/history', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const history = await Generation.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .select('productName brandVoice createdAt hasImage');
    res.json(history);
  } catch (err) {
    res.json([]);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const gen = await Generation.findById(req.params.id);
    if (!gen) return res.status(404).json({ error: 'Not found' });
    res.json(gen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;