require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const helmet = require('helmet');
const userRouter = require('./User/UserRouter');
const cors = require('cors');

const User = require('./User/UserModel');
const SECRET = process.env.SECRET;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'STATUS: OK' });
});

// Get a User's data
app.get('/api/getData', async (req, res) => {
  const handle = req.query.handle;

  try {
    // Attempt to scrape data
    const url = `https://www.instagram.com/${handle}/`;
    const data = await fetch(url);
    const text = await data.text();
    const $ = await cheerio.load(text);
    const allScripts = $('script').toArray();

    let targetScript = await allScripts.find(script => {
      if (script.children.length) {
        const data = script.children[0].data;
        return data.includes('window._sharedData = {');
      }
    });

    targetScript = targetScript.children[0].data;
    let scriptContents = targetScript.substring(
      targetScript.indexOf('{'),
      targetScript.length - 1
    );
    scriptContents = eval('(' + scriptContents + ')');
    const postData = scriptContents.entry_data.ProfilePage[0].graphql.user;
    const name = postData.full_name;
    const posts = postData.edge_owner_to_timeline_media.edges.map(edge => {
      return {
        url: edge.node.display_url,
        timestamp: edge.node.taken_at_timestamp,
        dimensions: edge.node.dimensions
      };
    });

    res.status(200).json({ name, handle, posts });
  } catch (err) {
    // Failed to scrape data
    res.status(500).json({ message: 'Error fetching!', err });
    console.error(err); // eslint-disable-line
  }
}); // /api/getData

// Register a new user. Expects JSON object with 'username' and 'password' field
app.post('/api/register', async (req, res) => {
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
    const user = await newUser.save();
    return res
      .status(201)
      .json({ message: 'New user succesfully registered!', user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error!', error });
  }
});

// Login user
app.post('/api/login', (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();

  // Error handling
  if (!username || !password) {
    res
      .status(422)
      .json({ error: 'You need to provide a username and password' });
  }

  // Find User model matching the provided username
  User.findOne({ username }, (err, user) => {
    if (err)
      return res.status(403).json({ error: 'Invalid username of password!' });
    if (user === null)
      return res.status(422).json({ error: 'User does not exist' });

    user.checkPassword(password, (nonMatch, isMatch) => {
      if (nonMatch)
        return res.status(422).json({ error: 'Incorrect password' });
      if (isMatch) {
        const payload = { username: user.username };
        const token = jwt.sign(payload, SECRET);
        return res.status(200).json({ token });
      }
    });
  });
}); // /api/login

module.exports = app;
