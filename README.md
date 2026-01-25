# FinEdge - Financial Management Backend API

A Node.js REST API for managing personal finances with income/expense tracking, budgets, and analytics.

## 📁 Project Structure

```
FinEdge_C17_Group4/
├── config/                 # Configuration files
│   ├── config.js          # App configuration
│   └── database.js        # Database initialization
├── controllers/           # Request handlers (MVC - Controllers)
│   ├── transactionController.js
│   ├── userController.js
│   └── summaryController.js
├── middleware/            # Custom middleware
│   ├── errorHandler.js    # Global error handler
│   ├── requestLogger.js   # Request logging
│   ├── validateTransaction.js  # Transaction validation
│   └── rateLimiter.js    # Rate limiting
├── models/                # Data models (MVC - Models)
│   ├── userModel.js
│   ├── transactionModel.js
│   └── budgetModel.js
├── routes/                # Route definitions
│   ├── healthRoutes.js
│   ├── userRoutes.js
│   ├── transactionRoutes.js
│   └── summaryRoutes.js
├── services/              # Business logic layer
│   ├── userService.js
│   ├── transactionService.js
│   └── summaryService.js
├── utils/                 # Utility functions
│   ├── errors.js         # Custom error classes
│   └── cacheService.js   # In-memory cache with TTL
├── tests/                 # Test files
│   ├── health.test.js
│   └── transaction.test.js
├── data/                  # JSON file storage
│   ├── users.json
│   ├── transactions.json
│   └── budgets.json
├── app.js                 # Express app setup
├── server.js              # Server entry point
├── package.json
├── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

3. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
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
- `models/userModel.js` - Add user authentication logic
- `models/transactionModel.js` - Enhance with filtering
- `models/budgetModel.js` - Complete budget CRUD
- `controllers/*.js` - Test and refine controllers
- `services/*.js` - Add business logic validation

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
- `middleware/errorHandler.js` - Enhance error handling
- `middleware/requestLogger.js` - Add more logging details
- `middleware/validateTransaction.js` - Complete validation rules
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
- [x] fs/promises for file persistence
- [ ] Test cases for core endpoints

**Files to work on:**
- `tests/health.test.js` - Complete test suite
- `tests/transaction.test.js` - Add more test cases
- `tests/user.test.js` - Create user tests
- `tests/summary.test.js` - Create summary tests
- `utils/jwt.js` - Implement JWT authentication (bonus)

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
- `services/analyticsService.js` - New service for analytics
- `controllers/analyticsController.js` - New controller
- `routes/analyticsRoutes.js` - New routes
- Enhance `summaryService.js` with filtering

---

#### **Option B: AI or Automation Feature**
**Assigned to:** [Member 6]

**Features:**
- [ ] Suggest saving tips based on past spending
- [ ] Auto-categorize expenses using keyword matching
- [ ] Real-time updates on new transactions

**Files to create:**
- `services/aiService.js` - AI/automation logic
- `utils/categoryMatcher.js` - Keyword matching for auto-categorization
- `services/budgetSuggestionService.js` - Budget suggestions

---

#### **Option C: Data Persistence** ✅ Already Implemented
- JSON file storage using fs/promises
- MongoDB integration can be added later

---

#### **Option D: Advanced Middleware** ✅ Partially Implemented
**Assigned to:** [Member 3 or Member 4]

**Features:**
- [x] Rate limiter for requests
- [x] CORS middleware
- [x] Request logging
- [x] In-memory cache service with TTL expiry (used in `/summary`)

**Files to enhance:**
- `middleware/rateLimiter.js` - Apply to routes
- `utils/cacheService.js` - Already implemented, enhance if needed

---

## 🔐 JWT Authentication (Bonus)

**Files to create:**
- `middleware/authMiddleware.js` - JWT verification
- `utils/jwt.js` - JWT token generation/verification
- Update routes to use auth middleware

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
- `jsonwebtoken` - JWT authentication
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
- ✅ File I/O with fs/promises
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
   - Create `.env` file from `.env.example`
   - Test `/health` endpoint
3. **Start implementing** assigned tasks
4. **Regular sync meetings** to discuss progress and merge conflicts
5. **Test thoroughly** before final submission

## 🐛 Troubleshooting

- **Port already in use:** Change `PORT` in `.env`
- **Database errors:** Ensure `data/` directory exists and is writable
- **Module not found:** Run `npm install` again

---

**Good luck with your project! 🚀**