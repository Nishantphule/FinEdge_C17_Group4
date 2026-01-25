const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { validateTransaction } = require('../middleware/validateTransaction');

/**
 * @route   POST /transactions
 * @desc    Add income/expense
 * @access  Public (add auth middleware later)
 */
router.post('/', validateTransaction, transactionController.createTransaction);

/**
 * @route   GET /transactions
 * @desc    Fetch all transactions
 * @access  Public (add auth middleware later)
 */
router.get('/', transactionController.getAllTransactions);

/**
 * @route   GET /transactions/:id
 * @desc    View single transaction
 * @access  Public (add auth middleware later)
 */
router.get('/:id', transactionController.getTransactionById);

/**
 * @route   PATCH /transactions/:id
 * @desc    Update transaction
 * @access  Public (add auth middleware later)
 */
router.patch('/:id', validateTransaction, transactionController.updateTransaction);

/**
 * @route   DELETE /transactions/:id
 * @desc    Delete transaction
 * @access  Public (add auth middleware later)
 */
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;