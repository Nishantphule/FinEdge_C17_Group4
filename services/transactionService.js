const transactionModel = require('../models/transactionModel');
const { AppError } = require('../utils/errors');

/**
 * Create a new transaction
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
  
  const transaction = await transactionModel.create(transactionData);
  return transaction;
};

/**
 * Get all transactions
 */
const getAllTransactions = async () => {
  return await transactionModel.findAll();
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
  
  return await transactionModel.update(id, updateData);
};

/**
 * Delete transaction
 */
const deleteTransaction = async (id) => {
  return await transactionModel.delete(id);
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};