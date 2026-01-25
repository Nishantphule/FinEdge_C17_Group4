const Joi = require('joi');
const { AppError } = require('../utils/errors');

/**
 * Joi validation middleware
 * Validates request body against a Joi schema
 * 
 * @param {Joi.ObjectSchema} schema - Joi schema to validate against
 * @returns {Function} Express middleware function
 * 
 * @example
 * // In routes file:
 * const { validateJoi } = require('../middleware/validateJoi');
 * const Joi = require('joi');
 * 
 * const userSchema = Joi.object({
 *   username: Joi.string().required(),
 *   email: Joi.string().email().required()
 * });
 * 
 * router.post('/', validateJoi(userSchema), controller.create);
 */
const validateJoi = (schema) => {
  return (req, res, next) => {
    // Validate request body against schema
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true, // Remove unknown keys
      convert: true // Convert types (e.g., string to number)
    });

    // If validation fails, return error
    if (error) {
      // Format Joi error messages
      const errorMessages = error.details.map(detail => detail.message).join(', ');
      
      return next(new AppError(`Validation Error: ${errorMessages}`, 400));
    }

    // Replace req.body with validated and sanitized value
    req.body = value;
    
    // Validation passed, proceed to next middleware
    next();
  };
};

module.exports = { validateJoi };