const mongoose = require('mongoose');

const GenerationSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, default: '' },
  brandVoice: { type: String, default: 'Gen Z' },
  audience: { type: String, default: 'Young Adults' },
  platform: { type: String, default: 'All Platforms' },
  includeReel: { type: Boolean, default: true },
  hasImage: { type: Boolean, default: false },
  outputs: {
    seo: String,
    instagram: String,
    linkedin: String,
    hashtags: String,
    reel: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Generation', GenerationSchema);