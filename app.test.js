require('dotenv').config();
const fetch = require('node-fetch');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const http = require('http');
const mongoose = require('mongoose');

const PORT = 9000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const app = require('./app.js');

describe('app.js test suite', () => {
  beforeAll(async () => {
    // Startup test DB
    const mongod = new MongoMemoryServer();
    const uri = await mongod.getConnectionString();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();

    // Connect to test DB
    await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    mongod.stop();
  });

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

  test('GET /api/getData', async () => {
    const handle = 'cats_of_instagram';
    const response = await fetch(`${BASE_URL}/api/getData?handle=${handle}`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data.handle).toBeDefined();
    expect(Array.isArray(data.posts)).toBe(true);
  });

  test('POST /api/register', async () => {
    const body = { username: 'testuser', password: '123456' };
    const headers = { 'Content-Type': 'application/json' };
    const options = { method: 'post', body: JSON.stringify(body), headers };

    const response = await fetch(`${BASE_URL}/api/register`, options);
    const responseJSON = await response.json();

    expect(responseJSON).toBeDefined();
    expect(responseJSON.user.username).toEqual('testuser');
    expect(responseJSON.user.pages).toBeDefined();
    expect(responseJSON.message).toEqual('New user succesfully registered!');
  });

  test('POST /api/login', async () => {
    const body = { username: 'testuser', password: '123456' };
    const headers = { 'Content-Type': 'application/json' };
    const options = { method: 'post', body: JSON.stringify(body), headers };

    const response = await fetch(`${BASE_URL}/api/login`, options);
    const responseJSON = await response.json();

    expect(responseJSON).toBeDefined();
    expect(responseJSON.token).toBeDefined();
  })

  test('GET /api/user/:username', async () => {
    const response = await fetch(`${BASE_URL}/api/user/testuser`)
    const responseJSON = await response.json();

    expect(responseJSON).toBeDefined();
    expect(responseJSON.username).toEqual('testuser');
    expect(responseJSON.pages).toBeDefined();
  })
});
