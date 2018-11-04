require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const helmet = require('helmet');
const userRouter = require('./User/UserRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'STATUS: OK' });
});

app.get('/api/getData', async (req, res) => {
  const handle = req.query.handle;

  try {
    const url = `https://www.instagram.com/${handle}/`
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
    res.status(500).json({ message: 'Error fetching!', err });
    console.error(err); // eslint-disable-line
  }
});

module.exports = app;
