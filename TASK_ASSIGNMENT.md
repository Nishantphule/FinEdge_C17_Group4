# Task Assignment Guide

## 📋 Project Status Overview

### ✅ Completed (Ready for Development)
- Project structure with MVC architecture
- All core files created with basic implementation
- Health route working
- Database initialization setup
- Middleware structure in place
- Test framework setup

### 🟡 Needs Implementation/Enhancement
- Complete endpoint testing
- Add more validation
- Implement bonus features
- Enhance error handling
- Add JWT authentication integration

---

## 👥 Suggested Task Division

### **Member 1: API Endpoints & Testing** (30 Points)
**Focus:** REST API Development + Testing

**Tasks:**
1. Test all transaction endpoints (POST, GET, PATCH, DELETE)
2. Test user registration endpoint
3. Test summary endpoint
4. Add edge case handling
5. Write comprehensive test cases
6. Fix any bugs found during testing

**Files to work on:**
- `tests/transaction.test.js` - Expand test coverage
- `tests/user.test.js` - Create new test file
- `tests/summary.test.js` - Create new test file
- `controllers/*.js` - Fix issues found during testing
- `services/*.js` - Enhance business logic

**Deliverables:**
- All endpoints working correctly
- Test coverage >80%
- All edge cases handled

---

### **Member 2: Middleware & Error Handling** (20 Points)
**Focus:** Async Programming & Middleware

**Tasks:**
1. Enhance error handler with more error types
2. Improve request logger (add response time, status codes)
3. Complete transaction validation (all fields)
4. Add user input validation middleware
5. Apply rate limiter to routes
6. Test all middleware

**Files to work on:**
- `middleware/errorHandler.js` - Add more error types
- `middleware/requestLogger.js` - Enhance logging
- `middleware/validateTransaction.js` - Complete validation
- `middleware/validateUser.js` - Create new validation middleware
- `app.js` - Apply rate limiter

**Deliverables:**
- All middleware working correctly
- Comprehensive error handling
- Request logging functional

---

### **Member 3: Data Models & Services** (20 Points)
**Focus:** Advanced Node Concepts

**Tasks:**
1. Enhance user model (add password hashing mock)
2. Complete budget model CRUD operations
3. Add transaction filtering (by category, date range)
4. Enhance summary service with filtering
5. Add data validation in models
6. Optimize file I/O operations

**Files to work on:**
- `models/userModel.js` - Add authentication fields
- `models/budgetModel.js` - Complete CRUD operations
- `models/transactionModel.js` - Add filtering methods
- `services/transactionService.js` - Add filtering logic
- `services/summaryService.js` - Add date/category filters

**Deliverables:**
- All models fully functional
- Filtering working
- Data persistence reliable

---

### **Member 4: JWT Authentication & Security** (Bonus)
**Focus:** JWT-based User Session

**Tasks:**
1. Implement user login endpoint
2. Add JWT token generation on login
3. Apply auth middleware to protected routes
4. Add password validation (mock)
5. Test authentication flow
6. Update routes to use authentication

**Files to work on:**
- `controllers/userController.js` - Add login method
- `services/userService.js` - Add login logic
- `routes/userRoutes.js` - Add login route
- `routes/transactionRoutes.js` - Apply auth middleware
- `routes/summaryRoutes.js` - Apply auth middleware
- `utils/jwt.js` - Already created, test it

**Deliverables:**
- Login endpoint working
- JWT tokens generated
- Protected routes secured

---

### **Member 5: Analytics & Reporting** (Bonus Feature A)
**Focus:** Analytics & Reporting

**Tasks:**
1. Calculate total income, expenses, balance
2. Filter transactions by category
3. Filter transactions by date range
4. Show monthly trends
5. Category-wise spending breakdown
6. Create analytics endpoints

**Files to create:**
- `services/analyticsService.js` - Analytics logic
- `controllers/analyticsController.js` - Analytics controller
- `routes/analyticsRoutes.js` - Analytics routes

**Files to enhance:**
- `services/summaryService.js` - Add filtering
- `models/transactionModel.js` - Add query methods

**Deliverables:**
- Analytics endpoints working
- Filtering by category/date
- Monthly trends calculated

---

### **Member 6: AI/Automation Features** (Bonus Feature B)
**Focus:** AI or Automation Feature

**Tasks:**
1. Auto-categorize expenses using keyword matching
2. Suggest saving tips based on spending patterns
3. Suggest budgets based on past spending
4. Real-time transaction notifications (mock)
5. Create automation service

**Files to create:**
- `services/aiService.js` - AI/automation logic
- `utils/categoryMatcher.js` - Keyword matching
- `services/budgetSuggestionService.js` - Budget suggestions
- `controllers/aiController.js` - AI controller
- `routes/aiRoutes.js` - AI routes

**Deliverables:**
- Auto-categorization working
- Saving tips generated
- Budget suggestions working

---

## 🔄 Workflow Recommendations

### Week 1: Foundation
- **Day 1-2:** All members set up environment, test health endpoint
- **Day 3-4:** Member 1 tests all endpoints, finds issues
- **Day 5:** Member 2 fixes middleware issues
- **Day 6-7:** Member 3 enhances models and services

### Week 2: Features & Bonus
- **Day 1-3:** Member 4 implements JWT authentication
- **Day 4-5:** Member 5 implements analytics
- **Day 6-7:** Member 6 implements AI features

### Week 3: Integration & Testing
- **Day 1-3:** Integrate all features
- **Day 4-5:** Comprehensive testing
- **Day 6-7:** Bug fixes and documentation

---

## 📝 Code Review Checklist

Before merging any code, ensure:
- [ ] Code follows MVC architecture
- [ ] Uses async/await (no callbacks)
- [ ] Error handling in place
- [ ] Input validation added
- [ ] Tests written (if applicable)
- [ ] No console.logs (use proper logging)
- [ ] Environment variables used (no hardcoded values)
- [ ] JSDoc comments added for functions

---

## 🚨 Important Notes

1. **Communication:** Use group chat for daily updates
2. **Git Workflow:** Create feature branches, don't push to main directly
3. **Testing:** Test your code before pushing
4. **Documentation:** Update README if you add new features
5. **Code Style:** Follow existing code patterns

---

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Check `QUICK_START.md` for setup instructions
- Review existing code for patterns
- Ask in group chat before blocking

---

**Good luck! 🚀**