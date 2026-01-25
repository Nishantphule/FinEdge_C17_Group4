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
    
    await mongoose.connect(MONGO_URL);
    
    console.log('✅ MongoDB connected successfully');
    
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