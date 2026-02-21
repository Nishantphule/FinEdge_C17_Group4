const express = require('express');
const cors = require('cors');
const app = express();

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');

// Import routes
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/health', healthRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/summary', summaryRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/ai', aiRoutes);

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;