const transactionModel = require('../models/transactionModel');
const { AppError } = require('../utils/errors');
const { autoCategorizeTransaction } = require('./aiService');

const cacheService = require('../utils/cacheService');

/**
 * Create a new transaction
 * Auto-categorizes if category is not provided
 */
const createTransaction = async (transactionData) => {
  // Validate transaction type
  if (!['income', 'expense'].includes(transactionData.type)) {
    throw new AppError('Transaction type must be either "income" or "expense"', 400);
  }

  // Validate amount
  if (!transactionData.amount || transactionData.amount <= 0) {
    throw new AppError('Amount must be a positive number', 400);
  }

  // Auto-categorize if category is missing or uncategorized
  const categorizedData = autoCategorizeTransaction(transactionData);

  const transaction = await transactionModel.create(categorizedData);

  // Invalidate summary cache when new transaction is created
  cacheService.delete('summary');

  return transaction;
};

/**
 * Get all transactions with optional filters
 * @param {Object} filters - Optional filters (type, category, dateFrom, dateTo)
 */
const getAllTransactions = async (filters = {}) => {
  return await transactionModel.findAll(filters);
};

/**
 * Get transaction by ID
 */
const getTransactionById = async (id) => {
  return await transactionModel.findById(id);
};

/**
 * Update transaction
 */
const updateTransaction = async (id, updateData) => {
  // Validate transaction type if provided
  if (updateData.type && !['income', 'expense'].includes(updateData.type)) {
    throw new AppError('Transaction type must be either "income" or "expense"', 400);
  }

  // Validate amount if provided
  if (updateData.amount !== undefined && updateData.amount <= 0) {
    throw new AppError('Amount must be a positive number', 400);
  }

  const transaction = await transactionModel.update(id, updateData);

  // Invalidate summary cache when transaction is updated
  if (transaction) {
    cacheService.delete('summary');
  }

  return transaction;
};

/**
 * Delete transaction
 */
const deleteTransaction = async (id) => {
  const deleted = await transactionModel.delete(id);

  // Invalidate summary cache when transaction is deleted
  if (deleted) {
    cacheService.delete('summary');
  }

  return deleted;
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};