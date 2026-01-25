const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateJoi } = require('../middleware/validateJoi');
const { userRegistrationSchema, userLoginSchema } = require('../validations/userSchema');

/**
 * @route   POST /users
 * @desc    Register new user
 * @access  Public
 */
router.post('/',validateJoi(userRegistrationSchema), userController.registerUser);

router.post('/login',validateJoi(userLoginSchema), userController.loginUser);

module.exports = router;