const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
      handle: { type: String, required: true, unique: true },
      dateAdded: { type: Date, required: true, default: Date.now }
    }
  ]
});

UserSchema.pre('save', next => {
  bcrypt.hash(this.password, BCRYPT_COST, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = (passwordAttempt, cb) => {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (!isMatch) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
