require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const fetch = require('node-fetch');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const User = require('./models/user');
const authenticate = require('./middleware/authenticate');

const SECRET = process.env.SECRET;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', authRouter);
app.use('/api/user', authenticate, userRouter);

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'STATUS: OK' });
});

// Get a User's data
app.get('/api/get-data', async (req, res) => {
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

module.exports = app;
