const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
async function initializeDatabase() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize JSON files if they don't exist
    const files = ['users.json', 'transactions.json', 'budgets.json'];
    for (const file of files) {
      const filePath = path.join(DATA_DIR, file);
      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(filePath, JSON.stringify([], null, 2));
      }
    }
    
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

module.exports = { initializeDatabase, DATA_DIR };