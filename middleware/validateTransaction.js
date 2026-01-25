const { AppError } = require('../utils/errors');

/**
 * Middleware to validate transaction inputs
 */
const validateTransaction = (req, res, next) => {
  const { type, amount, category, date } = req.body;
  
  // Validate type
  if (type && !['income', 'expense'].includes(type)) {
    return next(new AppError('Transaction type must be either "income" or "expense"', 400));
  }
  
  // Validate amount
  if (amount !== undefined) {
    if (typeof amount !== 'number' || amount <= 0) {
      return next(new AppError('Amount must be a positive number', 400));
    }
  }
  
  // Validate date format if provided
  if (date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return next(new AppError('Invalid date format', 400));
    }
  }
  
  next();
};

module.exports = { validateTransaction };