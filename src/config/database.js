const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 */
async function initializeDatabase() {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    
    if (!MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not set');
    }
    
    // If already connected, return
    if (mongoose.connection.readyState === 1) {
      return;
    }
    
    await mongoose.connect(MONGO_URL);
    
    if (process.env.NODE_ENV !== 'test') {
      console.log('✅ MongoDB connected successfully');
    }
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

module.exports = { initializeDatabase };