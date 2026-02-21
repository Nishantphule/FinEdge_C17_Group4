const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

describe('Transaction Routes', () => {
  let transactionId;

  // Skip tests if MongoDB is not available
  beforeAll(() => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      console.warn('⚠️ Skipping transaction tests - MongoDB not available');
    }
  });

  // Clean database before each test
  beforeEach(async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip if DB not available
    }
    if (mongoose.connection.readyState === 1) {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
    }
    transactionId = null;
  });

  test('POST /transactions should create a new transaction', async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip test
    }
    const transactionData = {
      type: 'income',
      category: 'salary',
      amount: 5000,
      description: 'Monthly salary'
    };

    const response = await request(app)
      .post('/transactions')
      .send(transactionData)
      .expect(201);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.type).toBe('income');
    expect(response.body.data.amount).toBe(5000);

    transactionId = response.body.data.id;
  });

  test('GET /transactions should return all transactions', async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip test
    }
    const response = await request(app)
      .get('/transactions')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('GET /transactions/:id should return a single transaction', async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip test
    }
    if (!transactionId) {
      // Create a transaction first if none exists
      const createResponse = await request(app)
        .post('/transactions')
        .send({
          type: 'expense',
          category: 'food',
          amount: 50
        });
      transactionId = createResponse.body.data.id;
    }

    const response = await request(app)
      .get(`/transactions/${transactionId}`)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('id', transactionId);
  });

  test('POST /transactions should validate transaction type', async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip test
    }
    const response = await request(app)
      .post('/transactions')
      .send({
        type: 'invalid',
        amount: 100
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
  });

  test('PATCH /transactions/:id should update a transaction', async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip test
    }
    if (!transactionId) {
      const createResponse = await request(app)
        .post('/transactions')
        .send({
          type: 'expense',
          category: 'food',
          amount: 50
        });
      transactionId = createResponse.body.data.id;
    }

    const response = await request(app)
      .patch(`/transactions/${transactionId}`)
      .send({
        amount: 75,
        description: 'Updated description'
      })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('id', transactionId);
    expect(response.body.data.amount).toBe(75);
  });

  test('DELETE /transactions/:id should delete a transaction', async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip test
    }
    // Create a transaction to delete
    const createResponse = await request(app)
      .post('/transactions')
      .send({
        type: 'expense',
        category: 'utilities',
        amount: 100
      });
    const deleteId = createResponse.body.data.id;

    const response = await request(app)
      .delete(`/transactions/${deleteId}`)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Transaction deleted successfully');

    // Verify it's deleted
    const getResponse = await request(app)
      .get(`/transactions/${deleteId}`)
      .expect(404);
  });

  test('GET /transactions/:id should return 404 for non-existent transaction', async () => {
    if (global.__MONGO_NOT_AVAILABLE__) {
      return; // Skip test
    }
    const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format but non-existent
    const response = await request(app)
      .get(`/transactions/${fakeId}`)
      .expect(404);

    expect(response.body).toHaveProperty('success', false);
  });
});