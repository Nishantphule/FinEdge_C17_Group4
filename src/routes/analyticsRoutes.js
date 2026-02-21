const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

/**
 * @route   GET /analytics
 * @desc    Get comprehensive analytics (summary, trends, category breakdown)
 * @access  Public (add auth middleware later)
 */
router.get('/', analyticsController.getAnalytics);

/**
 * @route   GET /analytics/trends
 * @desc    Get monthly trends
 * @access  Public (add auth middleware later)
 */
router.get('/trends', analyticsController.getMonthlyTrends);

/**
 * @route   GET /analytics/categories
 * @desc    Get category-wise breakdown
 * @access  Public (add auth middleware later)
 */
router.get('/categories', analyticsController.getCategoryBreakdown);

module.exports = router;
