const express = require('express')
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const SECRET = process.env.SECRET;

const authRouter = express.Router();

// Register a new user. Expects JSON object with 'username' and 'password' field
authRouter.post('/register', async (req, res) => {
  let { username, password } = req.body;
  // username = username.toLowerCase();

  // Error handling
  if (!username || !password) {
    res
      .status(422)
      .json({ error: 'You need to provide a username and password' });
  }

  try {
    const newUser = new User({ username, password });
    let user = await newUser.save();
    user = user.toObject();
    delete user.password;
    return res
      .status(201)
      .json({ message: 'New user succesfully registered!', user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error!', error });
  }
});

// Login user
authRouter.post('/login', (req, res) => {
  let { username, password } = req.body;

  // Error handling
  if (!username || !password) {
    res
      .status(422)
      .json({ error: 'You need to provide a username and password' });
  }

  // Find User model matching the provided username
  User.findOne({ username }, (err, user) => {
    if (err)
      return res.status(403).json({ error: 'Invalid username or password!' });
    if (user === null)
      return res.status(422).json({ error: 'User does not exist' });

    // Compare password using UserSchema method
    user.checkPassword(password, (error, isMatch) => {
      if (error) return res.status(422).json({ error });
      if (isMatch) {
        const payload = { username: user.username };
        const token = jwt.sign(payload, SECRET);
        return res.status(200).json({ token });
      }
    });
  });
}); // /api/login

module.exports = authRouter;
