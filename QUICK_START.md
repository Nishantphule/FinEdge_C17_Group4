# Quick Start Guide

## 🚀 Setup in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your settings (optional, defaults work fine)
```

### Step 3: Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## ✅ Verify Installation

1. **Check health endpoint:**
   ```bash
   curl http://localhost:3000/health
   ```
   Or open in browser: http://localhost:3000/health

2. **Expected response:**
   ```json
   {
     "status": "OK",
     "message": "Server is running",
     "timestamp": "2024-01-01T00:00:00.000Z",
     "uptime": 1.234
   }
   ```

## 📝 Test API Endpoints

### Create a Transaction
```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "income",
    "category": "salary",
    "amount": 5000,
    "description": "Monthly salary"
  }'
```

### Get All Transactions
```bash
curl http://localhost:3000/transactions
```

### Get Summary
```bash
curl http://localhost:3000/summary
```

### Register User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com"
  }'
```

## 🧪 Run Tests
```bash
npm test
```

## 📁 Project Structure Overview

```
├── config/          → Configuration & database setup
├── controllers/     → Request handlers
├── middleware/      → Custom middleware (auth, validation, etc.)
├── models/          → Data models (User, Transaction, Budget)
├── routes/          → API route definitions
├── services/        → Business logic
├── utils/           → Utilities (errors, cache, JWT)
├── tests/           → Test files
└── data/            → JSON file storage
```

## 🎯 Next Steps

1. Review the `README.md` for detailed task breakdown
2. Assign tasks to group members
3. Start implementing your assigned features
4. Test thoroughly before merging

## 🐛 Common Issues

**Issue:** `Cannot find module` errors
**Solution:** Run `npm install` again

**Issue:** Port 3000 already in use
**Solution:** Change `PORT` in `.env` file

**Issue:** Database initialization fails
**Solution:** Ensure `data/` directory is writable

---

Happy Coding! 🎉