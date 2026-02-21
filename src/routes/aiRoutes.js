const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

/**
 * @route   GET /ai/tips
 * @desc    Get saving tips based on spending patterns
 * @access  Public (add auth middleware later)
 */
router.get('/tips', aiController.getSavingTips);

/**
 * @route   GET /ai/budget-suggestions
 * @desc    Get budget suggestions based on historical data
 * @access  Public (add auth middleware later)
 */
router.get('/budget-suggestions', aiController.getBudgetSuggestions);

/**
 * @route   GET /ai/category-suggestions
 * @desc    Get category suggestions for a transaction description
 * @access  Public (add auth middleware later)
 * @query   description - Transaction description
 * @query   type - Transaction type (income/expense)
 */
router.get('/category-suggestions', aiController.getCategorySuggestions);

module.exports = router;
