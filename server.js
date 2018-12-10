require('dotenv').config();
const app = require('./app.js');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log('\n========== Instagram-Scraper =========');
  console.log(`\n=== Server listening on PORT: ${PORT} ===`);
});

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.connect(
  process.env.DB_URI,
  options,
  () => {
    console.log(`\n======= Connected to database ========\n`);
  }
);

module.exports = server;
