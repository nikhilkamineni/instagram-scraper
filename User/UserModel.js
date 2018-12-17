const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BCRYPT_COST = 11;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pages: [
    {
      handle: { type: String },
      dateAdded: { type: Date, default: Date.now }
    }
  ]
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, BCRYPT_COST, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (!isMatch) return cb('Password does not match!');
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
