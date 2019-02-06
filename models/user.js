const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const BCRYPT_COST = 11;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    spares: true
  },
  password: {
    type: String,
    required: true
  },
  pages: [
    {
      required: false,
      handle: { type: String, lowercase: true },
      dateAdded: { type: Date, default: Date.now }
    }
  ]
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, BCRYPT_COST, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.post("save", async function(doc, next) {
  await doc.update({ $push: { pages: { handle: "cats_of_instagram" } } });
  next();
});

UserSchema.methods.checkPassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (!isMatch) return cb("Incorrect password!");
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
