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

const PageModel = mongoose.Model('Page', PageSchema);
const UserModel = mongoose.Model('User', UserSchema);

module.exports = { UserModel, PageModel };
