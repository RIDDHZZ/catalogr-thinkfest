require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/api/generate', require('./routes/generate'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Catalogr API is running ✦' });
});

// Try MongoDB — but start server regardless
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB failed:', err.message);
    console.log('⚠️  Running without MongoDB — history will not be saved');
    // Disconnect so mongoose stops buffering operations
    await mongoose.disconnect();
  }

  app.listen(PORT, () => {
    console.log(`✦ Catalogr server running on http://localhost:${PORT}`);
  });
};

startServer();