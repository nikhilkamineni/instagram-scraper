require('dotenv').config();
const fetch = require('node-fetch');
const PORT = 9000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const app = require('./app.js');

describe('Server.js test suite', () => {
  let server;
  beforeEach(() => {
    server = app.listen(PORT);
  });

  afterEach(() => {
    server.close();
  });

  test('GET /api/getData/:page', async () => {
    const response = await fetch(`${BASE_URL}/api/getData/cats_of_instagram`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data.page).toBeDefined();
    expect(Array.isArray(data.posts)).toBe(true);
  });
});
