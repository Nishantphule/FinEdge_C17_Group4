const fs = require('fs').promises;
const path = require('path');
const { DATA_DIR } = require('../config/database');

const BUDGETS_FILE = path.join(DATA_DIR, 'budgets.json');

/**
 * Read budgets from file
 */
const readBudgets = async () => {
  try {
    const data = await fs.readFile(BUDGETS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

/**
 * Write budgets to file
 */
const writeBudgets = async (budgets) => {
  await fs.writeFile(BUDGETS_FILE, JSON.stringify(budgets, null, 2));
};

/**
 * Create a new budget
 */
const create = async (budgetData) => {
  const budgets = await readBudgets();
  const newBudget = {
    id: Date.now().toString(),
    monthlyGoal: budgetData.monthlyGoal,
    savingsTarget: budgetData.savingsTarget || 0,
    month: budgetData.month || new Date().toISOString().substring(0, 7), // YYYY-MM
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  budgets.push(newBudget);
  await writeBudgets(budgets);
  return newBudget;
};

/**
 * Find all budgets
 */
const findAll = async () => {
  return await readBudgets();
};

/**
 * Find budget by ID
 */
const findById = async (id) => {
  const budgets = await readBudgets();
  return budgets.find(budget => budget.id === id);
};

module.exports = {
  create,
  findAll,
  findById
};