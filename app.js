const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRouter = require("./routes/auth");
const getDataRouter = require("./routes/get-data");
const userRouter = require("./routes/user");
const authenticate = require("./middleware/authenticate");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Client routes
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.get("/settings", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// API routes
app.get("/api", (req, res) => {
  res.status(200).json({ message: "STATUS: OK" });
});
app.use("/api/auth", authRouter);
app.use("/api/get-data", getDataRouter);
app.use("/api/user", authenticate, userRouter);

module.exports = app;
