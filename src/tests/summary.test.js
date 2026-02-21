const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

describe('Summary Route', () => {
    // Skip tests if MongoDB is not available
    beforeAll(() => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            console.warn('⚠️ Skipping summary tests - MongoDB not available');
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

        // Create some test transactions
        await request(app)
            .post('/transactions')
            .send({
                type: 'income',
                category: 'salary',
                amount: 5000,
                description: 'Monthly salary'
            });

        await request(app)
            .post('/transactions')
            .send({
                type: 'expense',
                category: 'food',
                amount: 200,
                description: 'Groceries'
            });

        await request(app)
            .post('/transactions')
            .send({
                type: 'expense',
                category: 'utilities',
                amount: 150,
                description: 'Electricity bill'
            });
    });

    test('GET /summary should return income-expense summary', async () => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            return; // Skip test
        }
        const response = await request(app)
            .get('/summary')
            .expect(200);

        expect(response.body).toHaveProperty('success', true);
        expect(response.body.data).toHaveProperty('totalIncome');
        expect(response.body.data).toHaveProperty('totalExpense');
        expect(response.body.data).toHaveProperty('balance');
        expect(response.body.data).toHaveProperty('transactionCount');
        expect(response.body.data).toHaveProperty('incomeCount');
        expect(response.body.data).toHaveProperty('expenseCount');

        expect(response.body.data.totalIncome).toBeGreaterThanOrEqual(0);
        expect(response.body.data.totalExpense).toBeGreaterThanOrEqual(0);
        expect(response.body.data.balance).toBe(response.body.data.totalIncome - response.body.data.totalExpense);
    });

    test('GET /summary should use cache on subsequent requests', async () => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            return; // Skip test
        }
        const firstResponse = await request(app)
            .get('/summary')
            .expect(200);

        const secondResponse = await request(app)
            .get('/summary')
            .expect(200);

        // Both should return same data (cached)
        expect(firstResponse.body.data).toEqual(secondResponse.body.data);
    });
});
