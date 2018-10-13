require('dotenv').config();
const fetch = require('node-fetch');
const PORT = 9000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const app = require('./app.js');
const http = require('http');

describe('app.js test suite', () => {
  // Use `http` to create a server due to .close() being removed from express
  // https://github.com/expressjs/express/issues/1101#issuecomment-13668964
  const server = http.createServer(app);
  beforeEach(() => {
    server.listen(PORT);
  });

  afterEach(() => {
    server.close();
  });

  test('GET /', async () => {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data.message).toEqual('STATUS: OK');
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
