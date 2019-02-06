require("dotenv").config();
const app = require("./app.js");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log("\n============== zen-gram ==============");
  console.log(`\n\tEnvironment: ${NODE_ENV}`);
  console.log(`\n\tServer listening on PORT: ${PORT}`);
});

// Fix depracation warnings
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.connect(process.env.DB_URI, options, () => {
  console.log(`\n======= Connected to database ========\n`);
});

module.exports = server;
