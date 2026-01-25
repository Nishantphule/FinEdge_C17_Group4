const fs = require('fs').promises;
const path = require('path');
const { DATA_DIR } = require('../config/database');

const USERS_FILE = path.join(DATA_DIR, 'users.json');

/**
 * Read users from file
 */
const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

/**
 * Write users to file
 */
const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

/**
 * Create a new user
 */
const create = async (userData) => {
  const users = await readUsers();
  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    email: userData.email,
    preferences: userData.preferences || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  await writeUsers(users);
  return newUser;
};

/**
 * Find user by email
 */
const findByEmail = async (email) => {
  const users = await readUsers();
  return users.find(user => user.email === email);
};

/**
 * Find user by ID
 */
const findById = async (id) => {
  const users = await readUsers();
  return users.find(user => user.id === id);
};

module.exports = {
  create,
  findByEmail,
  findById
};