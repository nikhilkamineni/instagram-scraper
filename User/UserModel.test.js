const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const User = require('./UserModel');

const mongod = new MongodbMemoryServer();

describe('User.js test suite', () => {
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


  test('UserModel saves new user correctly', async () => {
    const newUser = { username: 'newTestUser', password: '123456' };
    const savedUser = await new User(newUser).save();
    expect(savedUser).toBeDefined();
    expect(savedUser.username).toBe('newTestUser');
    expect(savedUser.password).toBe('123456');
  });


  test('UserModel throws error if password is not supplied', async () => {
    const newUser = { username: 'newTestUser' };
    let savedUser;

    try {
      savedUser = await new User(newUser).save();
    } catch(error) {
      expect(savedUser).toBeUndefined();
      expect(error).toBeDefined();
    }
  });


  test('UserModel throws error if username is not supplied', async () => {
    const newUser = { password: '123456' };
    let savedUser;

    try {
      savedUser = await new User(newUser).save();
    } catch(error) {
      expect(savedUser).toBeUndefined();
      expect(error).toBeDefined();
    }
  });
});
