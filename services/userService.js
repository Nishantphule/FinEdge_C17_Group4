const userModel = require('../models/userModel');
const { AppError } = require('../utils/errors');

/**
 * Create a new user
 */
const createUser = async (userData) => {
  // Validate required fields
  if (!userData.username || !userData.email) {
    throw new AppError('Username and email are required', 400);
  }
  
  // Check if user already exists
  const existingUser = await userModel.findByEmail(userData.email);
  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }
  
  // Create user
  const user = await userModel.create(userData);
  return user;
};

module.exports = {
  createUser
};