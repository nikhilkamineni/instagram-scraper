require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function authenticate(req, res, next) {
  const token = req.headers.authorization.slice(7);
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) return res.status(403).json({ message: "Not authorized!" });
    req.user = decoded;
    next();
  });
}

module.exports = authenticate;
