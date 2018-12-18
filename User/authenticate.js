require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

function authenticate(req, res, next) {
  console.log('hit authenticate middleware');
  console.log(req.headers)
  const token = req.headers.authorization.slice(7)
  jwt.verify(token, SECRET, function(err, decoded) {
    console.log('decoded: ', decoded)
    req.user = decoded;
    next();
  })
}

module.exports = authenticate
