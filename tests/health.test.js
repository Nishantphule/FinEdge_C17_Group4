const request = require('supertest');
const app = require('../app');

describe('Health Route', () => {
  test('GET /health should return 200 and server status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('message', 'Server is running');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});