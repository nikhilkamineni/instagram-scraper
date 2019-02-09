require("dotenv").config();
const app = require("./app.js");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log("\n================= zen-gram ================="); //eslint-disable-line
  console.log(`\n\tEnvironment: ${NODE_ENV}`); //eslint-disable-line
  console.log(`\n\tServer listening on PORT: ${PORT}`); //eslint-disable-line
});

// Fix depracation warnings
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

// Setup MongoDB connection
mongoose.connect(process.env.DB_URI, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); //eslint-disable-line
db.once("open", () => {
  console.log(`\n\tConnected to DB: ${db.name}`); //eslint-disable-line
  console.log(`\n============================================\n`); //eslint-disable-line
});

module.exports = server;
