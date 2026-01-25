const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');

/**
 * @route   GET /summary
 * @desc    Fetch income-expense summary
 * @access  Public (add auth middleware later)
 */
router.get('/', summaryController.getSummary);

module.exports = router;