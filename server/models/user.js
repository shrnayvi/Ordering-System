const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  name: String,
  phone: String,
  status: Number
});

//check for user existence
// User.pre(save, async function() {

// });

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.comparePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('User', UserSchema);
