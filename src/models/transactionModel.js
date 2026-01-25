const Transaction = require('./schemas/transactionSchema');

/**
 * Create a new transaction
 */
const create = async (transactionData) => {
  const transaction = new Transaction({
    type: transactionData.type,
    category: transactionData.category || 'uncategorized',
    amount: transactionData.amount,
    date: transactionData.date || new Date(),
    description: transactionData.description || '',
    userId: transactionData.userId || null
  });
  
  return await transaction.save();
};

/**
 * Find all transactions
 * @param {Object} filters - Optional filters (userId, type, category, dateRange)
 */
const findAll = async (filters = {}) => {
  const query = {};
  
  if (filters.userId) {
    query.userId = filters.userId;
  }
  
  if (filters.type) {
    query.type = filters.type;
  }
  
  if (filters.category) {
    query.category = filters.category;
  }
  
  if (filters.dateFrom || filters.dateTo) {
    query.date = {};
    if (filters.dateFrom) {
      query.date.$gte = new Date(filters.dateFrom);
    }
    if (filters.dateTo) {
      query.date.$lte = new Date(filters.dateTo);
    }
  }
  
  return await Transaction.find(query).sort({ date: -1 });
};

/**
 * Find transaction by ID
 */
const findById = async (id) => {
  return await Transaction.findById(id);
};

/**
 * Update transaction
 */
const update = async (id, updateData) => {
  return await Transaction.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};

/**
 * Delete transaction
 */
const deleteTransaction = async (id) => {
  const result = await Transaction.findByIdAndDelete(id);
  return result !== null;
};

/**
 * Find transactions by category
 */
const findByCategory = async (category, filters = {}) => {
  const query = { category };
  if (filters.userId) {
    query.userId = filters.userId;
  }
  return await Transaction.find(query).sort({ date: -1 });
};

/**
 * Get transactions by date range
 */
const findByDateRange = async (startDate, endDate, filters = {}) => {
  const query = {
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  };
  
  if (filters.userId) {
    query.userId = filters.userId;
  }
  
  if (filters.type) {
    query.type = filters.type;
  }
  
  return await Transaction.find(query).sort({ date: -1 });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  delete: deleteTransaction,
  findByCategory,
  findByDateRange
};