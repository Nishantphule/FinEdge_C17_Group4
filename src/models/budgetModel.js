const Budget = require('./schemas/budgetSchema');

/**
 * Create a new budget
 */
const create = async (budgetData) => {
  const budget = new Budget({
    monthlyGoal: budgetData.monthlyGoal,
    savingsTarget: budgetData.savingsTarget || 0,
    month: budgetData.month || new Date().toISOString().substring(0, 7),
    userId: budgetData.userId || null
  });
  
  return await budget.save();
};

/**
 * Find all budgets
 * @param {Object} filters - Optional filters (userId, month)
 */
const findAll = async (filters = {}) => {
  const query = {};
  
  if (filters.userId) {
    query.userId = filters.userId;
  }
  
  if (filters.month) {
    query.month = filters.month;
  }
  
  return await Budget.find(query).sort({ month: -1 });
};

/**
 * Find budget by ID
 */
const findById = async (id) => {
  return await Budget.findById(id);
};

/**
 * Find budget by month
 */
const findByMonth = async (month, userId = null) => {
  const query = { month };
  if (userId) {
    query.userId = userId;
  }
  return await Budget.findOne(query);
};

/**
 * Update budget
 */
const update = async (id, updateData) => {
  return await Budget.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};

/**
 * Delete budget
 */
const deleteBudget = async (id) => {
  const result = await Budget.findByIdAndDelete(id);
  return result !== null;
};

module.exports = {
  create,
  findAll,
  findById,
  findByMonth,
  update,
  delete: deleteBudget
};