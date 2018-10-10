require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRouter = require('./User/UserRouter');

const server = express();

const PORT = 8000;

server.use(express.json());
server.use(helmet());
server.use('/api/user', userRouter);

server.get('/', (req, res) => {
  console.log('STATUS: OK');
  res.status(200).json({ message: 'STATUS: OK' });
});

server.get('/api/getData/:page', async (req, res) => {
  const page = req.params.page;

  try {
    const data = await fetch(`https://www.instagram.com/${page}`);
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
    const posts = postData.edge_owner_to_timeline_media.edges.map(edge => {
      return {
        url: edge.node.display_url,
        timestamp: edge.node.taken_at_timestamp,
        dimensions: edge.node.dimensions
      };
    });

    res.status(200).json({ page, posts });
    console.log('FETCH SUCCESS');
  } catch (err) {
    res.status(500).json({ message: 'Error fetching!', err });
    console.error(err);
    console.error('FETCH FAILED');
  }
});

server.listen(8000, () => {
  console.log(`\n==== Server is listening on PORT: ${PORT} ====\n`);
});

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true },
  () => {
    console.log(`\n========== Connected to database ==========\n`);
  }
);
