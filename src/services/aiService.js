const transactionModel = require('../models/transactionModel');
const { matchCategory, suggestCategories } = require('../utils/categoryMatcher');

/**
 * AI Service for financial insights and automation
 */

/**
 * Auto-categorize a transaction based on description
 * @param {Object} transactionData - Transaction data
 * @returns {Object} - Transaction data with auto-categorized category
 */
const autoCategorizeTransaction = (transactionData) => {
    // If category is already provided, use it
    if (transactionData.category && transactionData.category !== 'uncategorized') {
        return transactionData;
    }

    // Auto-categorize based on description
    if (transactionData.description) {
        const suggestedCategory = matchCategory(transactionData.description, transactionData.type);
        return {
            ...transactionData,
            category: suggestedCategory,
            autoCategorized: true
        };
    }

    return transactionData;
};

/**
 * Get saving tips based on spending patterns
 * @param {String} userId - Optional user ID
 * @returns {Array} - Array of saving tips
 */
const getSavingTips = async (userId = null) => {
    const filters = userId ? { userId, type: 'expense' } : { type: 'expense' };
    const expenses = await transactionModel.findAll(filters);

    // Calculate spending by category
    const categorySpending = {};
    expenses.forEach(expense => {
        const category = expense.category || 'uncategorized';
        categorySpending[category] = (categorySpending[category] || 0) + expense.amount;
    });

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Generate tips based on spending patterns
    const tips = [];

    // Tip 1: Identify highest spending category
    const topCategory = Object.entries(categorySpending)
        .sort(([, a], [, b]) => b - a)[0];

    if (topCategory && topCategory[1] > totalExpenses * 0.3) {
        tips.push({
            type: 'high_spending',
            category: topCategory[0],
            message: `You're spending ${((topCategory[1] / totalExpenses) * 100).toFixed(1)}% of your expenses on ${topCategory[0]}. Consider setting a budget for this category.`,
            suggestion: `Try to limit ${topCategory[0]} spending to ${(totalExpenses * 0.2).toFixed(2)} per month.`
        });
    }

    // Tip 2: Compare income vs expenses
    const income = await transactionModel.findAll({ type: 'income', ...(userId && { userId }) });
    const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);

    if (totalIncome > 0) {
        const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;

        if (savingsRate < 10) {
            tips.push({
                type: 'low_savings',
                message: `Your savings rate is ${savingsRate.toFixed(1)}%. Aim for at least 20% savings.`,
                suggestion: 'Review your expenses and identify areas where you can cut back.'
            });
        } else if (savingsRate >= 20) {
            tips.push({
                type: 'good_savings',
                message: `Great job! Your savings rate is ${savingsRate.toFixed(1)}%. Keep it up!`,
                suggestion: 'Consider investing your savings for long-term growth.'
            });
        }
    }

    // Tip 3: Frequent small expenses
    const smallExpenses = expenses.filter(exp => exp.amount < 50 && exp.amount > 0);
    const smallExpensesTotal = smallExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (smallExpenses.length > 10 && smallExpensesTotal > totalExpenses * 0.2) {
        tips.push({
            type: 'small_expenses',
            message: `You have ${smallExpenses.length} small expenses totaling ${smallExpensesTotal.toFixed(2)}. These add up!`,
            suggestion: 'Track small purchases - they can significantly impact your budget.'
        });
    }

    // Tip 4: Monthly trends
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    });
    const thisMonthTotal = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (thisMonthTotal > totalExpenses / 2) {
        tips.push({
            type: 'monthly_spending',
            message: `Your spending this month is ${thisMonthTotal.toFixed(2)}. Monitor your monthly budget.`,
            suggestion: 'Set up monthly spending alerts to stay on track.'
        });
    }

    return tips;
};

/**
 * Get budget suggestions based on historical spending
 * @param {String} userId - Optional user ID
 * @returns {Object} - Suggested budget breakdown
 */
const getBudgetSuggestions = async (userId = null) => {
    const filters = userId ? { userId, type: 'expense' } : { type: 'expense' };
    const expenses = await transactionModel.findAll(filters);

    // Calculate average monthly spending by category
    const categoryTotals = {};
    const categoryCounts = {};

    expenses.forEach(expense => {
        const category = expense.category || 'uncategorized';
        categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Calculate average monthly spending
    const totalSpending = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
    const monthsOfData = Math.max(1, Math.ceil(expenses.length / 10)); // Rough estimate
    const avgMonthlySpending = totalSpending / monthsOfData;

    // Generate budget suggestions (slightly higher than average for buffer)
    const suggestions = {};
    for (const [category, total] of Object.entries(categoryTotals)) {
        const avgMonthly = total / monthsOfData;
        suggestions[category] = {
            suggested: Math.ceil(avgMonthly * 1.1), // 10% buffer
            average: Math.round(avgMonthly),
            percentage: ((total / totalSpending) * 100).toFixed(1)
        };
    }

    return {
        totalMonthlyBudget: Math.ceil(avgMonthlySpending * 1.1),
        categoryBreakdown: suggestions,
        basedOnMonths: monthsOfData,
        recommendation: avgMonthlySpending > 0
            ? `Based on ${monthsOfData} month(s) of data, we suggest a monthly budget of ${Math.ceil(avgMonthlySpending * 1.1)}`
            : 'Not enough data to generate budget suggestions'
    };
};

/**
 * Get category suggestions for a transaction description
 * @param {String} description - Transaction description
 * @param {String} type - Transaction type
 * @returns {Array} - Suggested categories with confidence
 */
const getCategorySuggestions = (description, type = 'expense') => {
    return suggestCategories(description, type);
};

module.exports = {
    autoCategorizeTransaction,
    getSavingTips,
    getBudgetSuggestions,
    getCategorySuggestions
};
