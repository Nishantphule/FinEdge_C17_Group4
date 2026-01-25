const userService = require('../services/userService');
const { AppError } = require('../utils/errors');
const bcrypt = require('bcrypt');
/**
 * Register a new user
 */
const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userData.password, salt);
    userData.password = password;
    const user = await userService.createUser(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userData = req.body;
    
    const user = await userService.loginUser(userData);

   return res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    token: user
   });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};