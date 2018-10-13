const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const User = require('./UserModel');

const mongod = new MongodbMemoryServer();

describe('User.js test suite', () => {
  let existingTestUser;
  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );

    const testUserData = {
      username: 'existingTestUser',
      password: '123456',
      pages: [{ name: 'Cats of Instagram', handle: 'cats_of_instagram' }]
    };
    existingTestUser = await new User(testUserData).save();
  });

  afterAll(async () => {
    mongoose.disconnect();
    mongod.stop();
  });

  test('findById retrieves user correctly', async () => {
    const retrievedUser = await User.findById(existingTestUser._id);
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.username).toBe('existingTestUser');
    expect(retrievedUser.password).toBe('123456');
    expect(retrievedUser._id).toEqual(existingTestUser._id);
    expect(retrievedUser.pages[0].name).toBe('Cats of Instagram');
    expect(retrievedUser.pages[0].handle).toBe('cats_of_instagram');
  });

  test('findById returns null if id does not exist', async () => {
    const randomId = mongoose.Types.ObjectId();
    const retrievedUser = await User.findById(randomId);
    expect(retrievedUser).toBeNull();
  });

  test('findById throws error when receiving invalid id format', async () => {
    const randomNumber = Math.trunc(Math.random() * 100000 + 1);
    let retrievedUser;
    try {
      retrievedUser = await User.findById(randomNumber);
      expect(retrievedUser).toBeNull();
    } catch (error) {
      expect(error).toBeDefined();
    }
    expect(retrievedUser).toBeUndefined();
  });

  test('Creating a new User works correctly', async () => {
    const newUser = { username: 'newTestUser', password: '123456' };
    const savedUser = await new User(newUser).save();
    const retrievedUser = await User.findOne(newUser);

    expect(savedUser).toBeDefined();
    expect(savedUser.username).toBe('newTestUser');
    expect(savedUser.password).toBe('123456');
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.username).toBe('newTestUser');
    expect(retrievedUser.password).toBe('123456');
  });

  test('Creating a new User throws error if password is not supplied', async () => {
    const newUser = { username: 'newTestUser' };
    let savedUser;

    try {
      savedUser = await new User(newUser).save();
    } catch (error) {
      expect(savedUser).toBeUndefined();
      expect(error).toBeDefined();
    }
  });

  test('Creating a new User throws error if username is not supplied', async () => {
    const newUser = { password: '123456' };
    let savedUser;

    try {
      savedUser = await new User(newUser).save();
    } catch (error) {
      expect(savedUser).toBeUndefined();
      expect(error).toBeDefined();
    }
  });

  test('Saving a new page works correctly', async () => {
    const id = existingTestUser._id;
    const newPage = {
      $push: {
        pages: {
          name: 'Cats On Synthesizers In Space',
          handle: 'catsonsynthesizersinspace'
        }
      }
    };
    const options = { upsert: true, new: true };
    const updatedUser = await User.findByIdAndUpdate(id, newPage, options);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.username).toBe('existingTestUser');
    expect(updatedUser.pages.length).toBe(2);
    expect(updatedUser.pages[1].handle).toEqual('catsonsynthesizersinspace');
    expect(updatedUser.pages[1].name).toEqual('Cats On Synthesizers In Space');
  });
});
