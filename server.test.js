require('dotenv').config();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
// const User = require('./User/UserModel');

const mongod = new MongodbMemoryServer();

describe('Server.js test suite', () => {
  // beforeAll(async () => {
  //   const uri = await mongod.getConnectionString();
  //   await mongoose.connect(
  //     uri,
  //     { useNewUrlParser: true }
  //   );
  // });

  // afterAll(async () => {
  //   mongoose.disconnect();
  //   mongod.stop();
  // });

  test('Basic test', () => {
    const message = 'Hello World!';
    expect(typeof message).toBe('string');
  });

  test('GET /api/getData/:page', async () => {
    const response = await fetch(
      `${process.env.BASE_URL}/api/getData/cats_of_instagram`
    );
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data.page).toBeDefined();
    expect(Array.isArray(data.posts)).toBe(true);
  });
});
