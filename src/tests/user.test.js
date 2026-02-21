const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

describe('User Routes', () => {
    let userId;

    // Skip tests if MongoDB is not available
    beforeAll(() => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            console.warn('⚠️ Skipping user tests - MongoDB not available');
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
        userId = null;
    });

    test('POST /users should create a new user', async () => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            return; // Skip test
        }
        const userData = {
            username: 'testuser',
            email: 'test@example.com'
        };

        const response = await request(app)
            .post('/users')
            .send(userData)
            .expect(201);

        expect(response.body).toHaveProperty('success', true);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.username).toBe('testuser');
        expect(response.body.data.email).toBe('test@example.com');

        userId = response.body.data.id;
    });

    test('POST /users should validate required fields', async () => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            return; // Skip test
        }
        const response = await request(app)
            .post('/users')
            .send({
                username: 'test'
            })
            .expect(400);

        expect(response.body).toHaveProperty('success', false);
    });

    test('POST /users should validate email format', async () => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            return; // Skip test
        }
        const response = await request(app)
            .post('/users')
            .send({
                username: 'testuser2',
                email: 'invalid-email'
            })
            .expect(400);

        expect(response.body).toHaveProperty('success', false);
    });

    test('POST /users should reject duplicate email', async () => {
        if (global.__MONGO_NOT_AVAILABLE__) {
            return; // Skip test
        }
        // First user
        await request(app)
            .post('/users')
            .send({
                username: 'user1',
                email: 'duplicate@example.com'
            });

        // Try to create another user with same email
        const response = await request(app)
            .post('/users')
            .send({
                username: 'user2',
                email: 'duplicate@example.com'
            })
            .expect(409);

        expect(response.body).toHaveProperty('success', false);
    });
});
