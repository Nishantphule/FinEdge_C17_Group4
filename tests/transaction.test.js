const request = require('supertest');
const app = require('../app');

describe('Transaction Routes', () => {
  let transactionId;

  test('POST /transactions should create a new transaction', async () => {
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
    const response = await request(app)
      .get('/transactions')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('GET /transactions/:id should return a single transaction', async () => {
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
    const response = await request(app)
      .post('/transactions')
      .send({
        type: 'invalid',
        amount: 100
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
  });
});