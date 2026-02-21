const transactionModel = require('../models/transactionModel');

/**
 * Get monthly trends - income and expenses by month
 */
const getMonthlyTrends = async (months = 6) => {
    const transactions = await transactionModel.findAll();

    // Calculate date range (last N months)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    // Filter transactions within date range
    const filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });

    // Group by month
    const monthlyData = {};

    filteredTransactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const monthKey = `${date.getFullYear()}-${month}`;

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                month: monthKey,
                income: 0,
                expense: 0,
                balance: 0,
                transactionCount: 0
            };
        }

        if (transaction.type === 'income') {
            monthlyData[monthKey].income += transaction.amount;
        } else {
            monthlyData[monthKey].expense += transaction.amount;
        }

        monthlyData[monthKey].transactionCount++;
        monthlyData[monthKey].balance = monthlyData[monthKey].income - monthlyData[monthKey].expense;
    });

    // Convert to array and sort by month
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Get category-wise spending breakdown
 */
const getCategoryBreakdown = async (type = null) => {
    const filters = type ? { type } : {};
    const transactions = await transactionModel.findAll(filters);

    const categoryData = {};

    transactions.forEach(transaction => {
        const category = transaction.category || 'uncategorized';

        if (!categoryData[category]) {
            categoryData[category] = {
                category,
                totalAmount: 0,
                transactionCount: 0,
                averageAmount: 0
            };
        }

        categoryData[category].totalAmount += transaction.amount;
        categoryData[category].transactionCount++;
    });

    // Calculate averages
    Object.keys(categoryData).forEach(category => {
        categoryData[category].averageAmount =
            categoryData[category].totalAmount / categoryData[category].transactionCount;
    });

    // Convert to array and sort by total amount (descending)
    return Object.values(categoryData).sort((a, b) => b.totalAmount - a.totalAmount);
};

/**
 * Get analytics summary with all metrics
 */
const getAnalytics = async (filters = {}) => {
    const allTransactions = await transactionModel.findAll(filters);

    // Calculate totals
    const summary = {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactionCount: allTransactions.length,
        incomeCount: 0,
        expenseCount: 0
    };

    allTransactions.forEach(transaction => {
        if (transaction.type === 'income') {
            summary.totalIncome += transaction.amount;
            summary.incomeCount++;
        } else {
            summary.totalExpense += transaction.amount;
            summary.expenseCount++;
        }
    });

    summary.balance = summary.totalIncome - summary.totalExpense;

    // Get monthly trends
    const monthlyTrends = await getMonthlyTrends(6);

    // Get category breakdown
    const categoryBreakdown = await getCategoryBreakdown();
    const incomeByCategory = await getCategoryBreakdown('income');
    const expenseByCategory = await getCategoryBreakdown('expense');

    return {
        summary,
        monthlyTrends,
        categoryBreakdown: {
            all: categoryBreakdown,
            income: incomeByCategory,
            expense: expenseByCategory
        }
    };
};

module.exports = {
    getMonthlyTrends,
    getCategoryBreakdown,
    getAnalytics
};
