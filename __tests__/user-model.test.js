const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const User = require('../models/user');

const mongod = new MongodbMemoryServer();

describe('User.js test suite', () => {
  // Connect to the mongodb before tests are run
  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );
  });

  // Disconnect from mongodb after all tests are completed
  afterAll(async () => {
    mongoose.disconnect();
    mongod.stop();
  });

  // Save a test user before each test starts
  let existingTestUser;
  beforeEach(async () => {
    const testUserData = {
      username: 'existingTestUser',
      password: '123456',
      pages: [{ handle: 'cats_of_instagram' }, { handle: 'animals.co' }]
    };
    existingTestUser = await new User(testUserData).save();
  });

  // Clear the collection after each test is run
  afterEach(async () => {
    await User.remove({});
  });

  test('findById retrieves user correctly', async () => {
    const retrievedUser = await User.findById(existingTestUser._id);
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.username).toBe('existingTestUser');
    // expect(retrievedUser.password).toBe('123456');
    expect(retrievedUser._id).toEqual(existingTestUser._id);
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
    const retrievedUser = await User.findOne({username: newUser.username});

    expect(savedUser).toBeDefined();
    expect(savedUser.username).toBe('newTestUser');
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.username).toBe('newTestUser');
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
          handle: 'catsonsynthesizersinspace'
        }
      }
    };
    const options = { upsert: true, new: true };
    const updatedUser = await User.findByIdAndUpdate(id, newPage, options);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.username).toBe('existingTestUser');
    expect(updatedUser.pages.length).toBe(3);
    expect(updatedUser.pages[2].handle).toEqual('catsonsynthesizersinspace');
  });


  test('Deleting a page works correctly', async () => {
    const id = mongoose.mongo.ObjectID(existingTestUser._id);
    const pageId = mongoose.mongo.ObjectID(existingTestUser.pages[0]._id);
    const pageToRemove = {
      $pull: {
        pages: {
          _id: pageId
        }
      }
    };
    const options = { new: true };
    updatedUser = await User.findByIdAndUpdate(id, pageToRemove, options);

    expect(id).toBeDefined();
    expect(pageId).toBeDefined();
    expect(existingTestUser.pages.length).toBe(2);
    expect(updatedUser.pages.length).toBe(1);
  });
});
