const Joi = require('joi');

// Transaction schema
const transactionSchema = Joi.object({
    type: Joi.string()
      .valid('income', 'expense')
      .required()
      .messages({
        'any.only': 'Transaction type must be either "income" or "expense"',
        'any.required': 'Transaction type is required'
      }),
    category: Joi.string()
      .trim()
      .min(1)
      .max(50)
      .optional()
      .default('uncategorized'),
    amount: Joi.number()
      .positive()
      .required()
      .messages({
        'number.positive': 'Amount must be a positive number',
        'any.required': 'Amount is required'
      }),
    date: Joi.date()
      .optional()
      .default(() => new Date()),
    description: Joi.string()
      .trim()
      .max(500)
      .optional()
      .allow('')
      .default('')
  });
  
  // Budget schema
  const budgetSchema = Joi.object({
    monthlyGoal: Joi.number()
      .positive()
      .required()
      .messages({
        'number.positive': 'Monthly goal must be a positive number',
        'any.required': 'Monthly goal is required'
      }),
    savingsTarget: Joi.number()
      .min(0)
      .optional()
      .default(0),
    month: Joi.string()
      .pattern(/^\d{4}-\d{2}$/)
      .optional()
      .default(() => new Date().toISOString().substring(0, 7))
      .messages({
        'string.pattern.base': 'Month must be in YYYY-MM format'
      })
  });
  
  // Transaction update schema (all fields optional)
  const transactionUpdateSchema = Joi.object({
    type: Joi.string()
      .valid('income', 'expense')
      .optional(),
    category: Joi.string()
      .trim()
      .min(1)
      .max(50)
      .optional(),
    amount: Joi.number()
      .positive()
      .optional(),
    date: Joi.date()
      .optional(),
    description: Joi.string()
      .trim()
      .max(500)
      .optional()
      .allow('')
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  });

  module.exports = {
    transactionSchema,
    transactionUpdateSchema,
    budgetSchema
  };