require('dotenv').config();
const fetch = require('node-fetch');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const http = require('http');
const mongoose = require('mongoose');

const PORT = 9000;
const BASE_URL = `http://localhost:${PORT}`;
const app = require('../app.js');

const mongod = new MongoMemoryServer();

describe('app.js test suite', () => {
  /* SETUP */
  beforeAll(async () => {
    // Startup test DB
    const uri = await mongod.getConnectionString();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();

    // Connect to test DB
    await mongoose.connect(
      uri,
      { useNewUrlParser: true, useFindAndModify: false }
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
  test('[GET] /api', async () => {
    const response = await fetch(`${BASE_URL}/api`);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data.message).toEqual('STATUS: OK');
  });

  test('[GET] /api/get-data', async () => {
    const handle = 'cats_of_instagram';
    const response = await fetch(`${BASE_URL}/api/get-data?handle=${handle}`);
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
  };

  // auth routes
  describe('Test for /auth routes', () => {
    test('[POST] /api/auth/register', async () => {
      const newUser = await fetch(`${BASE_URL}/api/auth/register`, {
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
      expect(newUserJSON.user.passwrod).toBeUndefined();
      expect(newUserJSON.message).toEqual('New user succesfully registered!');
    });

    test('[POST] /api/auth/login', async () => {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ username: 'testUser', password: '123456' }),
        headers: { 'Content-Type': 'application/json' }
      });
      const responseJSON = await response.json();

      testUser.token = responseJSON.token;
      expect(responseJSON).toBeDefined();
      expect(responseJSON.token).toBeDefined();
    });
  });

  // user routes
  describe('Tests for /user routes', () => {
    test('[GET] /api/user/get-user', async () => {
      const response = await fetch(`${BASE_URL}/api/user/get-user`, {
        headers: { Authorization: `Bearer ${testUser.token}` }
      });
      const responseJSON = await response.json();

      expect(responseJSON).toBeDefined();
      expect(responseJSON.username).toEqual('testUser');
      expect(responseJSON._id).toBeDefined();
      expect(responseJSON.password).toBeUndefined();
      expect(responseJSON.pages).toBeDefined();
    });

    test('[POST] /api/user/save-page', async () => {
      const response = await fetch(`${BASE_URL}/api/user/save-page`, {
        method: 'post',
        body: JSON.stringify({ handle: 'cats_of_instagram' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${testUser.token}`
        }
      });

      const responseJSON = await response.json();
      testUser.pages = responseJSON.pages;

      expect(responseJSON.username).toEqual(testUser.username);
      expect(responseJSON.password).toBeUndefined();
      expect(responseJSON.pages.length).toBe(1);
      expect(responseJSON.pages[0].handle).toEqual('cats_of_instagram');
    });

    test('[PUT] /api/user/delete-page', async () => {
      const response = await fetch(`${BASE_URL}/api/user/delete-page`, {
        method: 'put',
        body: JSON.stringify({ pageId: testUser.pages[0]._id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${testUser.token}`
        }
      });

      const responseJSON = await response.json();

      expect(responseJSON.updatedUser.username).toEqual(testUser.username);
      expect(responseJSON.updatedUser.password).toBeUndefined();
      expect(responseJSON.updatedUser.pages.length).toBe(0);
      // expect(responseJSON.pages[0].handle).toEqual('cats_of_instagram');
    });
  });
});
