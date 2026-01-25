const fs = require('fs').promises;
const path = require('path');
const { DATA_DIR } = require('../config/database');

const TRANSACTIONS_FILE = path.join(DATA_DIR, 'transactions.json');

/**
 * Read transactions from file
 */
const readTransactions = async () => {
  try {
    const data = await fs.readFile(TRANSACTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

/**
 * Write transactions to file
 */
const writeTransactions = async (transactions) => {
  await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
};

/**
 * Create a new transaction
 */
const create = async (transactionData) => {
  const transactions = await readTransactions();
  const newTransaction = {
    id: Date.now().toString(),
    type: transactionData.type, // 'income' or 'expense'
    category: transactionData.category || 'uncategorized',
    amount: transactionData.amount,
    date: transactionData.date || new Date().toISOString(),
    description: transactionData.description || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  transactions.push(newTransaction);
  await writeTransactions(transactions);
  return newTransaction;
};

/**
 * Find all transactions
 */
const findAll = async () => {
  return await readTransactions();
};

/**
 * Find transaction by ID
 */
const findById = async (id) => {
  const transactions = await readTransactions();
  return transactions.find(transaction => transaction.id === id);
};

/**
 * Update transaction
 */
const update = async (id, updateData) => {
  const transactions = await readTransactions();
  const index = transactions.findIndex(transaction => transaction.id === id);
  
  if (index === -1) {
    return null;
  }
  
  transactions[index] = {
    ...transactions[index],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  
  await writeTransactions(transactions);
  return transactions[index];
};

/**
 * Delete transaction
 */
const deleteTransaction = async (id) => {
  const transactions = await readTransactions();
  const index = transactions.findIndex(transaction => transaction.id === id);
  
  if (index === -1) {
    return false;
  }
  
  transactions.splice(index, 1);
  await writeTransactions(transactions);
  return true;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  delete: deleteTransaction
};