const mongoose = require('mongoose');

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/finedge_test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.PORT = '3001';

// Connect to test database before all tests
beforeAll(async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    
    if (!MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not set');
    }
    
    // Close any existing connection first
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    // Connect to MongoDB with timeout
    const connectPromise = mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 3000, // 3 second timeout
      socketTimeoutMS: 3000
    });
    
    await Promise.race([
      connectPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 3000)
      )
    ]);
    
    // Suppress console.log in tests unless verbose
    if (process.env.VERBOSE_TESTS === 'true') {
      console.log('✅ Test database connected');
    }
  } catch (error) {
    console.warn('⚠️ Test database connection failed:', error.message);
    console.warn('⚠️ Tests will be skipped. Make sure MongoDB is running.');
    // Mark that DB is not available
    global.__MONGO_NOT_AVAILABLE__ = true;
  }
}, 10000); // 10 second timeout

// Clean up database after each test suite (not after each test)
// This allows tests within a suite to share data if needed
// Individual test files can clean up if needed
afterEach(async () => {
  // Optional: Clean specific collections if needed
  // Uncomment to clean after each test
  // try {
  //   if (mongoose.connection.readyState === 1) {
  //     const collections = mongoose.connection.collections;
  //     for (const key in collections) {
  //       await collections[key].deleteMany({});
  //     }
  //   }
  // } catch (error) {
  //   console.error('Error cleaning test database:', error);
  // }
});

// Close database connection after all tests
afterAll(async () => {
  // Skip if DB was never connected
  if (global.__MONGO_NOT_AVAILABLE__) {
    return;
  }
  
  try {
    if (mongoose.connection.readyState !== 0) {
      await Promise.race([
        mongoose.connection.close(),
        new Promise((resolve) => setTimeout(resolve, 2000))
      ]);
      if (process.env.VERBOSE_TESTS === 'true') {
        console.log('✅ Test database connection closed');
      }
    }
  } catch (error) {
    // Ignore errors during cleanup
  }
}, 3000); // 3 second timeout
