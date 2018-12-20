require('dotenv').config();
const fetch = require('node-fetch');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const http = require('http');
const mongoose = require('mongoose');

const PORT = 9000;
const BASE_URL = `http://localhost:${PORT}`;
const app = require('./app.js');

describe('app.js test suite', () => {
  /* SETUP */
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
  const testServer = http.createServer(app);
  beforeEach(async () => {
    await testServer.listen(PORT);
  });

  afterEach(() => {
    testServer.close();
  });

  /* TESTS */
  test('GET /', async () => {
    const response = await fetch(`${BASE_URL}`);
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

  // Initial test user; token will be added to this object in /login test
  const testUser = {
    username: 'testUser',
    password: '123456'
  }

  test('POST /api/register', async () => {
    const newUser = await fetch(`${BASE_URL}/api/register`, {
      method: 'post',
      body: JSON.stringify({
        username: 'testUser',
        password: '123456'
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const newUserJSON = await newUser.json();

    expect(newUserJSON).toBeDefined();
    expect(newUserJSON.user.username).toEqual('testUser');
    expect(newUserJSON.user.pages).toBeDefined();
    expect(newUserJSON.user._id).toBeDefined();
    expect(newUserJSON.message).toEqual('New user succesfully registered!');
  });

  test('POST /api/login', async () => {
    const token = await fetch(`${BASE_URL}/api/login`, {
      method: 'post',
      body: JSON.stringify({ username: 'testUser', password: '123456' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const tokenJSON = await token.json();

    testUser.token = tokenJSON.token;
    expect(tokenJSON).toBeDefined();
    expect(tokenJSON.token).toBeDefined();
  });

  test('GET /api/user/getUser', async () => {
    const response = await fetch(`${BASE_URL}/api/user/getUser`, {
      headers: { Authorization: `Bearer ${testUser.token}` }
    });
    const responseJSON = await response.json();

    expect(responseJSON).toBeDefined();
    expect(responseJSON.username).toEqual('testUser');
    expect(responseJSON._id).toBeDefined();
    expect(responseJSON.pages).toBeDefined();
  });
});
