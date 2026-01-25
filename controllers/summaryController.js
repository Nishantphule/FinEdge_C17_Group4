const summaryService = require('../services/summaryService');

/**
 * Get income-expense summary
 */
const getSummary = async (req, res, next) => {
  try {
    const summary = await summaryService.getSummary();
    
    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummary
};