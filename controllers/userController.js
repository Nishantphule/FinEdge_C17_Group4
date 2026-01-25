const userService = require('../services/userService');
const { AppError } = require('../utils/errors');

/**
 * Register a new user
 */
const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
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

module.exports = {
  registerUser
};