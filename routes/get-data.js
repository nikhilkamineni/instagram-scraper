const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const getDataRouter = express.Router();

// Scrape instagram data (page name sent as a query) and return
// an array containing links to the first page of images
getDataRouter.get('/', async (req, res) => {
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

module.exports = getDataRouter;
