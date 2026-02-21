# FinEdge - Financial Management Backend API

**Group:** C17_Group4  
**Project:** FinEdge Backend API  
**Technology Stack:** Node.js, Express.js, MongoDB, Mongoose

A comprehensive Node.js REST API for managing personal finances with income/expense tracking, budgets, analytics, and AI-powered insights.

---

## 📋 Project Requirements Checklist

### 1. Fundamentals & Setup (10 Points) ✅
- ✅ Project initialized with `npm init`
- ✅ MVC folder structure implemented
- ✅ Health route created (`GET /health`)

**Files:**
- `package.json` - Project configuration
- `src/app.js` - Express app setup
- `src/server.js` - Server entry point
- `src/routes/healthRoutes.js` - Health check endpoint

---

### 2. REST API Development (30 Points) ✅

#### Core Entities:
- ✅ **User** → manages authentication and preferences
- ✅ **Transaction** → type (income/expense), category, amount, date
- ✅ **Budget** → monthly goal and savings target

#### Core Endpoints:
- ✅ `POST /users` - Register new user
- ✅ `POST /transactions` - Add income/expense
- ✅ `GET /transactions` - Fetch all transactions
- ✅ `GET /transactions/:id` - View single transaction
- ✅ `PATCH /transactions/:id` - Update transaction
- ✅ `DELETE /transactions/:id` - Delete transaction
- ✅ `GET /summary` - Fetch income-expense summary

**Files:**
- `src/models/` - Data models (User, Transaction, Budget)
- `src/controllers/` - Request handlers
- `src/routes/` - Route definitions
- `src/services/` - Business logic

---

### 3. Async Programming & Middleware (20 Points) ✅
- ✅ Use async/await for all DB operations (MongoDB with Mongoose)
- ✅ Global error-handling middleware
- ✅ Custom middleware for logging request details
- ✅ Custom middleware for validating transaction inputs (Joi validation)

**Files:**
- `src/middleware/errorHandler.js` - Global error handler
- `src/middleware/requestLogger.js` - Request logging
- `src/middleware/validateJoi.js` - Joi validation middleware
- `src/middleware/validateTransaction.js` - Transaction validation

**Example (async/await):**
```javascript
// All database operations use async/await
const createTransaction = async (transactionData) => {
  const transaction = await transactionModel.create(transactionData);
  return transaction;
};
```

---

### 4. Advanced Node Concepts (20 Points) ✅
- ✅ Modular routes and controllers
- ✅ Reusable services for business logic
- ✅ Environment variables for configuration management
- ✅ Custom error classes
- ✅ MongoDB for data persistence
- ✅ Test cases for core endpoints
- ✅ **Bonus:** JWT-based user session implementation

**Files:**
- `src/config/config.js` - Environment configuration
- `src/utils/errors.js` - Custom AppError class
- `src/utils/jwt.js` - JWT utilities
- `src/tests/` - Test suites (14 tests passing)

**Test Coverage:**
- Health endpoint tests
- User registration and validation tests
- Transaction CRUD operation tests
- Summary endpoint tests

---

### 5. Bonus Features (20 Points - Choose 2) ✅

#### Option C: Data Persistence ✅
- ✅ MongoDB database integration
- ✅ Mongoose ODM with schemas and validation
- ✅ Automatic timestamps and indexing
- ✅ Data validation at schema level

**Files:**
- `src/config/database.js` - MongoDB connection
- `src/models/schemas/` - Mongoose schemas

#### Option D: Advanced Middleware ✅
- ✅ Rate limiter for requests
- ✅ CORS middleware
- ✅ Request logging middleware
- ✅ In-memory cache service with TTL expiry
- ✅ Cache used in `/summary` endpoint

**Files:**
- `src/middleware/rateLimiter.js` - Rate limiting
- `src/utils/cacheService.js` - Cache with TTL
- `src/services/summaryService.js` - Uses cache

#### Additional Bonus Features Implemented:

**Option A: Analytics & Reporting ✅**
- ✅ Calculate total income, expenses, and balance
- ✅ Filter transactions by category/date
- ✅ Monthly trends analysis
- ✅ Category-wise spending breakdown

**Option B: AI or Automation Feature ✅**
- ✅ Auto-categorize expenses using keyword matching
- ✅ Suggest saving tips based on spending patterns
- ✅ Suggest budgets based on historical data

---

## 📁 Project Structure

```
FinEdge_C17_Group4/
├── src/
<<<<<<< HEAD
│   ├── config/                 # Configuration
│   │   ├── config.js          # App configuration
│   │   └── database.js        # MongoDB connection
│   ├── controllers/           # Request handlers (MVC)
│   │   ├── transactionController.js
│   │   ├── userController.js
│   │   ├── summaryController.js
│   │   ├── analyticsController.js
│   │   └── aiController.js
│   ├── middleware/            # Custom middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── requestLogger.js   # Request logging
│   │   ├── validateJoi.js     # Joi validation
│   │   ├── validateTransaction.js
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── rateLimiter.js    # Rate limiting
│   ├── models/                # Data models (MVC)
=======
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
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f
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
<<<<<<< HEAD
│   │   ├── summaryRoutes.js
│   │   ├── analyticsRoutes.js
│   │   └── aiRoutes.js
│   ├── services/              # Business logic
│   │   ├── userService.js
│   │   ├── transactionService.js
│   │   ├── summaryService.js
│   │   ├── analyticsService.js
│   │   └── aiService.js
│   ├── utils/                 # Utilities
│   │   ├── errors.js         # Custom error classes
│   │   ├── cacheService.js   # In-memory cache with TTL
│   │   ├── jwt.js            # JWT utilities
│   │   └── categoryMatcher.js # AI category matching
│   ├── validations/           # Joi schemas
=======
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
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f
│   │   ├── userSchema.js
│   │   ├── transactionsSchema.js
│   │   └── summarySchema.js
│   ├── tests/                 # Test files
<<<<<<< HEAD
│   │   ├── setup.js          # Test configuration
│   │   ├── health.test.js
│   │   ├── transaction.test.js
│   │   ├── user.test.js
│   │   └── summary.test.js
│   ├── app.js                 # Express app
=======
│   │   ├── health.test.js
│   │   └── transaction.test.js
│   ├── app.js                 # Express app setup
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f
│   └── server.js              # Server entry point
├── package.json
├── jest.config.js            # Jest configuration
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm
<<<<<<< HEAD
- MongoDB (local or Atlas)
=======
- MongoDB (local installation or MongoDB Atlas account)
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

<<<<<<< HEAD
2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `MONGO_URL`:
   ```env
   MONGO_URL=mongodb://localhost:27017/finedge
   ```

3. **Start server:**
=======
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
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

<<<<<<< HEAD
---
=======
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
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f

## 📋 API Endpoints

### Core Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/health` | Health check |
| POST | `/users` | Register user |
| POST | `/transactions` | Create transaction |
| GET | `/transactions` | Get all transactions |
| GET | `/transactions/:id` | Get transaction by ID |
| PATCH | `/transactions/:id` | Update transaction |
| DELETE | `/transactions/:id` | Delete transaction |
| GET | `/summary` | Get income-expense summary |

### Bonus Endpoints

**Analytics:**
- `GET /analytics` - Comprehensive analytics
- `GET /analytics/trends?months=6` - Monthly trends
- `GET /analytics/categories?type=expense` - Category breakdown

**AI Features:**
- `GET /ai/tips` - Saving tips
- `GET /ai/budget-suggestions` - Budget suggestions
- `GET /ai/category-suggestions?description=coffee&type=expense` - Category suggestions

**Filtering:**
- `GET /transactions?type=income` - Filter by type
- `GET /transactions?category=food` - Filter by category
- `GET /transactions?dateFrom=2024-01-01&dateTo=2024-01-31` - Filter by date

---

## 🗄️ Database

**Technology:** MongoDB with Mongoose ODM

<<<<<<< HEAD
**Collections:**
- `users` - User accounts
- `transactions` - Income/expense records
- `budgets` - Budget goals

**Features:**
- Schema validation
- Automatic timestamps
- Indexed queries
- Data transformation
=======
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
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f

---

## ✅ Key Features Implemented

### 1. MVC Architecture ✅
- Clear separation: Models, Views (JSON responses), Controllers
- Reusable services for business logic
- Modular route definitions

<<<<<<< HEAD
### 2. Async/Await ✅
- All database operations use async/await
- Proper error handling with try/catch
- No callback hell

### 3. Middleware ✅
- Global error handler
- Request logging
- Input validation (Joi)
- Rate limiting
- CORS support

### 4. Data Validation ✅
- Joi schemas for request validation
- Mongoose schema validation
- Custom validation middleware

### 5. Error Handling ✅
- Custom AppError class
- Global error handler middleware
- Proper HTTP status codes

### 6. Caching ✅
- In-memory cache with TTL
- Used in `/summary` endpoint
- Automatic cache invalidation

### 7. Testing ✅
- Jest test framework
- 14 test cases passing
- Coverage for core endpoints

### 8. AI Features ✅
- Auto-categorization of transactions
- Saving tips generation
- Budget suggestions
- Category matching

---

=======
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

>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f
## 🧪 Testing

**Test Results:**
- ✅ 4 test suites passed
- ✅ 14 tests passed
- ✅ All core endpoints tested

**Run tests:**
```bash
npm test
```

**Test Files:**
- `src/tests/health.test.js` - Health endpoint
- `src/tests/user.test.js` - User endpoints
- `src/tests/transaction.test.js` - Transaction CRUD
- `src/tests/summary.test.js` - Summary endpoint

---

## 📦 Dependencies

**Production:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
<<<<<<< HEAD
- `joi` - Data validation
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
=======
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `joi` - Data validation
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f
- `cors` - CORS middleware
- `express-rate-limit` - Rate limiting

**Development:**
- `jest` - Testing framework
- `supertest` - HTTP assertions
- `nodemon` - Auto-reload

---

## 🎯 Requirements Mapping

| Requirement | Points | Status | Evidence |
|------------|--------|--------|----------|
| Fundamentals & Setup | 10 | ✅ | `package.json`, MVC structure, `/health` route |
| REST API Development | 30 | ✅ | All 7 endpoints implemented |
| Async & Middleware | 20 | ✅ | async/await, error handler, logging, validation |
| Advanced Node Concepts | 20 | ✅ | Modular code, services, env vars, tests, JWT |
| Bonus Features (2 required) | 20 | ✅ | Data Persistence + Advanced Middleware |
| **Additional Bonus** | - | ✅ | Analytics + AI Features |

**Total Points: 100 + Bonus**

---

## 📝 Code Quality

- ✅ Clean, modular code structure
- ✅ Consistent naming conventions
- ✅ Proper error handling
- ✅ Input validation
- ✅ JSDoc comments
- ✅ Test coverage
- ✅ Environment configuration
- ✅ No hardcoded values

---

## 🔍 Evaluation Guide for Mentors

### How to Verify Requirements:

1. **Fundamentals (10 pts):**
   - Check `package.json` for npm init
   - Verify MVC structure in `src/` folder
   - Test `GET /health` endpoint

2. **REST API (30 pts):**
   - Test all 7 core endpoints
   - Verify User, Transaction, Budget models exist
   - Check CRUD operations work

3. **Async & Middleware (20 pts):**
   - Check `src/middleware/` for custom middleware
   - Verify async/await in `src/services/` and `src/models/`
   - Test error handling with invalid requests

4. **Advanced Concepts (20 pts):**
   - Verify modular structure
   - Check `src/config/config.js` for env vars
   - Run `npm test` to verify tests
   - Check `src/utils/jwt.js` for JWT implementation

5. **Bonus Features (20 pts):**
   - Verify MongoDB connection in `src/config/database.js`
   - Check cache implementation in `src/utils/cacheService.js`
   - Test rate limiting
   - Verify analytics endpoints
   - Test AI auto-categorization

### Quick Test Commands:

```bash
# Start server
npm start

# Test health
curl http://localhost:3000/health

# Create transaction (auto-categorizes)
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{"type":"expense","amount":50,"description":"coffee shop"}'

# Get summary
curl http://localhost:3000/summary

# Get AI tips
curl http://localhost:3000/ai/tips

# Run tests
npm test
```

---

## 🎓 Learning Objectives Achieved

- ✅ MVC Architecture
- ✅ RESTful API Design
- ✅ Async/Await Programming
- ✅ Middleware Implementation
- ✅ Error Handling
<<<<<<< HEAD
- ✅ MongoDB Integration
- ✅ Data Validation
- ✅ JWT Authentication
- ✅ Testing
- ✅ Caching
- ✅ Rate Limiting
- ✅ AI/Automation Features

---

## 📞 Support

For issues or questions:
1. Check `.env` configuration
2. Verify MongoDB is running
3. Review error logs
4. Run `npm test` to verify setup

---

**Project Status: ✅ Complete and Evaluation Ready**

**All requirements met with additional bonus features implemented.**
=======
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
>>>>>>> 2efa46fa319dca3224bbfc2b497390c7850cc72f
