const mongoose = require('mongoose');
// const fetch = require('node-fetch');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
// const User = require('./User/UserModel');

const mongod = new MongodbMemoryServer();

describe('Server.js test suite', () => {
  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );
  });

  afterAll(async () => {
    mongoose.disconnect();
    mongod.stop();
  });

  test('Basic test', () => {
    const message = 'Hello World!';
    expect(typeof message).toBe('string');
  });
});
