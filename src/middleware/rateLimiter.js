const rateLimit = require('express-rate-limit');
const config = require('../config/config');

/**
 * Rate limiter middleware
 * Limits the number of requests from a single IP
 */
const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { rateLimiter };