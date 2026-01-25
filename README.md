# FinEdge - Financial Management Backend API

A Node.js REST API for managing personal finances with income/expense tracking, budgets, and analytics.

## 📁 Project Structure

```
FinEdge_C17_Group4/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── config.js          # App configuration
│   │   └── database.js        # MongoDB connection
│   ├── controllers/           # Request handlers (MVC - Controllers)
│   │   ├── transactionController.js
│   │   ├── userController.js
│   │   └── summaryController.js
│   ├── middleware/            # Custom middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── requestLogger.js   # Request logging
│   │   ├── validateJoi.js     # Joi validation middleware
│   │   ├── validateTransaction.js  # Transaction validation
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── rateLimiter.js    # Rate limiting
│   ├── models/                # Data models (MVC - Models)
│   │   ├── schemas/           # Mongoose schemas
│   │   │   ├── userSchema.js
│   │   │   ├── transactionSchema.js
│   │   │   └── budgetSchema.js
│   │   ├── userModel.js
│   │   ├── transactionModel.js
│   │   └── budgetModel.js
│   ├── routes/                # Route definitions
│   │   ├── healthRoutes.js
│   │   ├── userRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── summaryRoutes.js
│   ├── services/              # Business logic layer
│   │   ├── userService.js
│   │   ├── transactionService.js
│   │   └── summaryService.js
│   ├── utils/                 # Utility functions
│   │   ├── errors.js         # Custom error classes
│   │   ├── cacheService.js   # In-memory cache with TTL
│   │   └── jwt.js            # JWT token utilities
│   ├── validations/           # Joi validation schemas
│   │   ├── userSchema.js
│   │   ├── transactionsSchema.js
│   │   └── summarySchema.js
│   ├── tests/                 # Test files
│   │   ├── health.test.js
│   │   └── transaction.test.js
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up MongoDB:**
   
   **Option A: Local MongoDB**
   - Install MongoDB locally: [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)
   - Start MongoDB service
   - Default connection: `mongodb://localhost:27017/finedge`
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get your connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/finedge`

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your `MONGO_URL`:
   ```env
   MONGO_URL=mongodb://localhost:27017/finedge
   # or for Atlas:
   # MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/finedge
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

## 🗄️ Database

This project uses **MongoDB** with **Mongoose ODM** for data persistence.

### Database Structure

- **Users Collection**: Stores user accounts with authentication data
- **Transactions Collection**: Stores income and expense transactions
- **Budgets Collection**: Stores monthly budget goals and savings targets

### Mongoose Schemas

All schemas are defined in `src/models/schemas/`:
- `userSchema.js` - User model with email validation
- `transactionSchema.js` - Transaction model with type, category, amount
- `budgetSchema.js` - Budget model with monthly goals

### Features

- ✅ Automatic `createdAt` and `updatedAt` timestamps
- ✅ Data validation at schema level
- ✅ Indexes for optimized queries
- ✅ Automatic `_id` to `id` transformation in JSON responses
- ✅ Support for filtering and querying

## ✅ Data Validation

The project uses **Joi** for request validation with a reusable middleware.

### Validation Middleware

- **Location**: `src/middleware/validateJoi.js`
- **Usage**: Pass a Joi schema to validate request body
- **Features**: 
  - Validates all fields
  - Strips unknown fields
  - Converts types automatically
  - Returns formatted error messages

### Validation Schemas

Pre-defined schemas in `src/validations/`:
- `userSchema.js` - User registration validation
- `transactionsSchema.js` - Transaction creation/update validation
- `summarySchema.js` - Summary query validation

### Example Usage

```javascript
const { validateJoi } = require('../middleware/validateJoi');
const { userRegistrationSchema } = require('../validations/userSchema');

router.post('/', validateJoi(userRegistrationSchema), controller.create);
```

## 📋 API Endpoints

### Health Check
- `GET /health` - Verify server is running

### Users
- `POST /users` - Register new user

### Transactions
- `POST /transactions` - Add income/expense
- `GET /transactions` - Fetch all transactions
- `GET /transactions/:id` - View single transaction
- `PATCH /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

### Summary
- `GET /summary` - Fetch income-expense summary (with caching)

## 🎯 Task Breakdown for Group Members

### **Task 1: Fundamentals & Setup** (10 Points)
**Assigned to:** [Member 1]
- ✅ Project initialized with npm
- ✅ MVC folder structure created
- ✅ Health route implemented (`/health`)

**Status:** ✅ Complete

---

### **Task 2: REST API Development** (30 Points)
**Assigned to:** [Member 2]

**Core Entities:**
- [ ] User model and endpoints
- [ ] Transaction model and endpoints
- [ ] Budget model (structure ready)

**Endpoints to implement:**
- [x] `POST /users` - Register new user
- [x] `POST /transactions` - Add income/expense
- [x] `GET /transactions` - Fetch all transactions
- [x] `GET /transactions/:id` - View single transaction
- [x] `PATCH /transactions/:id` - Update transaction
- [x] `DELETE /transactions/:id` - Delete transaction
- [x] `GET /summary` - Fetch income-expense summary

**Files to work on:**
- `src/models/userModel.js` - User authentication logic (with bcrypt)
- `src/models/transactionModel.js` - Enhanced with filtering capabilities
- `src/models/budgetModel.js` - Complete budget CRUD operations
- `src/controllers/*.js` - Test and refine controllers
- `src/services/*.js` - Add business logic validation

**Status:** 🟡 In Progress (Structure ready, needs testing & refinement)

---

### **Task 3: Async Programming & Middleware** (20 Points)
**Assigned to:** [Member 3]

**Requirements:**
- [x] Use async/await for DB operations
- [x] Global error-handling middleware
- [x] Request logging middleware
- [x] Transaction validation middleware

**Files to work on:**
- `src/middleware/errorHandler.js` - Enhance error handling
- `src/middleware/requestLogger.js` - Add more logging details
- `src/middleware/validateJoi.js` - Joi validation middleware (✅ Implemented)
- `src/middleware/validateTransaction.js` - Complete validation rules
- Review all async/await usage in models and services

**Status:** 🟡 In Progress (Basic implementation done, needs enhancement)

---

### **Task 4: Advanced Node Concepts** (20 Points)
**Assigned to:** [Member 4]

**Requirements:**
- [x] Modular routes and controllers
- [x] Reusable services for business logic
- [x] Environment variables configuration
- [x] Custom error classes
- [x] MongoDB for data persistence (✅ Implemented)
- [ ] Test cases for core endpoints

**Files to work on:**
- `src/tests/health.test.js` - Complete test suite
- `src/tests/transaction.test.js` - Add more test cases
- `src/tests/user.test.js` - Create user tests
- `src/tests/summary.test.js` - Create summary tests
- `src/utils/jwt.js` - JWT authentication utilities (✅ Implemented)

**Status:** 🟡 In Progress (Structure ready, tests need completion)

---

### **Task 5: Bonus Features** (20 Points - Choose 2)
**Assigned to:** [Member 5 & Member 6]

#### **Option A: Analytics & Reporting**
**Assigned to:** [Member 5]

**Features:**
- [ ] Calculate total income, expenses, and balance
- [ ] Filter transactions by category/date
- [ ] Show monthly trends
- [ ] Category-wise spending breakdown

**Files to create/enhance:**
- `src/services/analyticsService.js` - New service for analytics
- `src/controllers/analyticsController.js` - New controller
- `src/routes/analyticsRoutes.js` - New routes
- Enhance `src/services/summaryService.js` with filtering

---

#### **Option B: AI or Automation Feature**
**Assigned to:** [Member 6]

**Features:**
- [ ] Suggest saving tips based on past spending
- [ ] Auto-categorize expenses using keyword matching
- [ ] Real-time updates on new transactions

**Files to create:**
- `src/services/aiService.js` - AI/automation logic
- `src/utils/categoryMatcher.js` - Keyword matching for auto-categorization
- `src/services/budgetSuggestionService.js` - Budget suggestions

---

#### **Option C: Data Persistence** ✅ Already Implemented
- MongoDB database integration (✅ Implemented)
- Mongoose ODM for schema management
- Automatic timestamps and data validation

---

#### **Option D: Advanced Middleware** ✅ Partially Implemented
**Assigned to:** [Member 3 or Member 4]

**Features:**
- [x] Rate limiter for requests
- [x] CORS middleware
- [x] Request logging
- [x] In-memory cache service with TTL expiry (used in `/summary`)

**Files to enhance:**
- `src/middleware/rateLimiter.js` - Apply to routes
- `src/utils/cacheService.js` - Already implemented, enhance if needed

---

## 🔐 JWT Authentication (Bonus) ✅ Implemented

**Files:**
- `src/middleware/authMiddleware.js` - JWT verification (✅ Implemented)
- `src/utils/jwt.js` - JWT token generation/verification (✅ Implemented)
- Update routes to use auth middleware (in progress)

## 📝 Development Guidelines

### Code Style
- Use async/await for all async operations
- Follow MVC architecture strictly
- Keep controllers thin, business logic in services
- Use custom error classes for error handling
- Add JSDoc comments for functions

### Testing
- Write tests for all endpoints
- Test error cases
- Test validation middleware
- Aim for >80% code coverage

### Git Workflow
1. Create feature branches: `git checkout -b feature/task-name`
2. Commit frequently with clear messages
3. Push and create pull requests
4. Review code before merging

## 🧪 Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📦 Dependencies

### Production
- `express` - Web framework
- `dotenv` - Environment variables
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `joi` - Data validation
- `cors` - CORS middleware
- `express-rate-limit` - Rate limiting

### Development
- `nodemon` - Auto-reload during development
- `jest` - Testing framework
- `supertest` - HTTP assertions for testing

## 🎓 Learning Objectives Covered

- ✅ MVC Architecture
- ✅ RESTful API Design
- ✅ Async/Await Programming
- ✅ Middleware Implementation
- ✅ Error Handling
- ✅ MongoDB Database Integration
- ✅ Mongoose ODM
- ✅ Joi Data Validation
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Environment Variables
- ✅ Modular Code Structure
- ✅ Testing with Jest
- ✅ Caching Strategy
- ✅ Rate Limiting

## 📞 Next Steps

1. **Divide tasks** among group members based on the breakdown above
2. **Set up development environment** - Each member should:
   - Clone the repository
   - Run `npm install`
   - Set up MongoDB (local or Atlas)
   - Create `.env` file from `.env.example` and configure `MONGO_URL`
   - Test `/health` endpoint
   - Verify MongoDB connection on server start
3. **Start implementing** assigned tasks
4. **Regular sync meetings** to discuss progress and merge conflicts
5. **Test thoroughly** before final submission

## 🐛 Troubleshooting

- **Port already in use:** Change `PORT` in `.env`
- **MongoDB connection errors:** 
  - Ensure MongoDB is running (local) or check Atlas connection string
  - Verify `MONGO_URL` in `.env` is correct
  - Check network/firewall settings for Atlas
- **Module not found:** Run `npm install` again
- **Validation errors:** Check Joi schema definitions in `src/validations/`
- **JWT errors:** Verify `JWT_SECRET` is set in `.env`

---

**Good luck with your project! 🚀**
