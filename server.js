const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const server = express();

const PORT = 8000;

server.get('/', (req, res) => {
  console.log('STATUS: OK');
  res.status(200).json({ message: 'STATUS: OK' });
});

server.get('/getData/:page', async (req, res) => {
  try {
    const data = await fetch(`https://www.instagram.com/${req.params.page}`);
    const text = await data.text();
    const $ = await cheerio.load(text);
    const allScripts = await $('script').toArray();

    const script = await allScripts.find(script => {
      if (script.children.length) {
        const data = script.children[0].data;
        if (data.includes('window._sharedData = {')) {
          return true;
        }
      }
    });

    let scriptContents = await script.children[0].data;
    scriptContents = scriptContents.substring(
      scriptContents.indexOf('{'),
      scriptContents.length - 1
    );
    const scriptEval = await eval('(' + scriptContents + ')');
    const postData = scriptEval.entry_data.ProfilePage[0].graphql.user
    const edges = postData.edge_owner_to_timeline_media.edges.map(edge => {
      return edge.node.display_url;
    })

    res.status(200).json({
      page: req.params.page,
      edges
    });
    console.log('FETCH SUCCESS');
  } catch (err) {
    res.status(500).json({ message: 'Error fetching!', err });
    console.error(err);
    console.error('FETCH FAILED');
  }
});

server.listen(8000, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
