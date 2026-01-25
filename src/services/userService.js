const userModel = require('../models/userModel');
const { AppError } = require('../utils/errors');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');
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

const loginUser = async (userData) => {
  const user = await userModel.findByEmail(userData.email);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const isPasswordValid = await bcrypt.compare(userData.password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid password', 401);
  }
  const token = generateToken({ userId: user._id });
  return token;
};
module.exports = {
  createUser,
  loginUser
};