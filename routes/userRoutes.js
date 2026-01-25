const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route   POST /users
 * @desc    Register new user
 * @access  Public
 */
router.post('/', userController.registerUser);

module.exports = router;