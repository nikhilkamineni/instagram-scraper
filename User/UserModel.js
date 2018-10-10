const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page'
    }
  ]
});

const Page = mongoose.model('Page', PageSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { User, Page };
