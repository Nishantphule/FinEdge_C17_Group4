const { verifyToken } = require('../utils/jwt');
const { AppError } = require('../utils/errors');

/**
 * JWT Authentication Middleware
 * Verifies JWT token from Authorization header
 */
const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Attach user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};

module.exports = { authenticate };