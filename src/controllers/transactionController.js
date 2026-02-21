const transactionService = require('../services/transactionService');
const { AppError } = require('../utils/errors');

/**
 * Create a new transaction
 */
const createTransaction = async (req, res, next) => {
  try {
    const transactionData = req.body;
    const transaction = await transactionService.createTransaction(transactionData);

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all transactions with optional filtering
 * Query params: type, category, dateFrom, dateTo
 */
const getAllTransactions = async (req, res, next) => {
  try {
    const filters = {
      type: req.query.type,
      category: req.query.category,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key =>
      filters[key] === undefined && delete filters[key]
    );

    const transactions = await transactionService.getAllTransactions(filters);

    res.status(200).json({
      success: true,
      count: transactions.length,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get transaction by ID
 */
const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update transaction
 */
const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const transaction = await transactionService.updateTransaction(id, updateData);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete transaction
 */
const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await transactionService.deleteTransaction(id);

    if (!deleted) {
      throw new AppError('Transaction not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};