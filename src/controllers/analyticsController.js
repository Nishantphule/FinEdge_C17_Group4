const analyticsService = require('../services/analyticsService');

/**
 * Get monthly trends
 */
const getMonthlyTrends = async (req, res, next) => {
    try {
        const months = parseInt(req.query.months) || 6;
        const trends = await analyticsService.getMonthlyTrends(months);

        res.status(200).json({
            success: true,
            data: trends
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get category breakdown
 */
const getCategoryBreakdown = async (req, res, next) => {
    try {
        const type = req.query.type || null; // 'income', 'expense', or null for all
        const breakdown = await analyticsService.getCategoryBreakdown(type);

        res.status(200).json({
            success: true,
            filters: type ? { type } : undefined,
            data: breakdown
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get comprehensive analytics
 */
const getAnalytics = async (req, res, next) => {
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

        const analytics = await analyticsService.getAnalytics(filters);

        res.status(200).json({
            success: true,
            filters: Object.keys(filters).length > 0 ? filters : undefined,
            data: analytics
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMonthlyTrends,
    getCategoryBreakdown,
    getAnalytics
};
