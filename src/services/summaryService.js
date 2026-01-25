const transactionModel = require('../models/transactionModel');
const cacheService = require('../utils/cacheService');

/**
 * Get income-expense summary
 * Uses cache to avoid recomputing data repeatedly
 */
const getSummary = async () => {
  // Check cache first
  const cacheKey = 'summary';
  const cached = cacheService.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Fetch all transactions
  const transactions = await transactionModel.findAll();
  
  // Calculate summary
  const summary = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactionCount: transactions.length,
    incomeCount: 0,
    expenseCount: 0
  };
  
  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      summary.totalIncome += transaction.amount;
      summary.incomeCount++;
    } else {
      summary.totalExpense += transaction.amount;
      summary.expenseCount++;
    }
  });
  
  summary.balance = summary.totalIncome - summary.totalExpense;
  
  // Cache the result
  cacheService.set(cacheKey, summary);
  
  return summary;
};

module.exports = {
  getSummary
};