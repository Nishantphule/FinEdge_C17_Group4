const aiService = require('../services/aiService');

/**
 * Get saving tips based on spending patterns
 */
const getSavingTips = async (req, res, next) => {
    try {
        const userId = req.user?.id || null; // Get from auth if available
        const tips = await aiService.getSavingTips(userId);

        res.status(200).json({
            success: true,
            count: tips.length,
            data: tips
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get budget suggestions based on historical data
 */
const getBudgetSuggestions = async (req, res, next) => {
    try {
        const userId = req.user?.id || null; // Get from auth if available
        const suggestions = await aiService.getBudgetSuggestions(userId);

        res.status(200).json({
            success: true,
            data: suggestions
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get category suggestions for a transaction description
 */
const getCategorySuggestions = async (req, res, next) => {
    try {
        const { description, type = 'expense' } = req.query;

        if (!description) {
            return res.status(400).json({
                success: false,
                error: 'Description is required'
            });
        }

        const suggestions = aiService.getCategorySuggestions(description, type);

        res.status(200).json({
            success: true,
            data: {
                description,
                type,
                suggestions
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSavingTips,
    getBudgetSuggestions,
    getCategorySuggestions
};
