require('dotenv').config();
const app = require('./app.js');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`\n=== Server listening on PORT: ${PORT} ===\n`);
});

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true },
  () => {
    console.log(`\n======= Connected to database ========\n`);
  }
);

module.exports = server;
