const bcrypt   = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   email: String,
   username: String,
   password: String,
   googleId: String,
   name: String,
   phone: String,
   status: Number,
   role: String,
   createdAt: Number,
   updatedAt: Number,
});

//check for user existence
// UserSchema.pre("save", function(next) { });

UserSchema.methods.generateHash = function (password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.comparePassword = function (password, hash) {
   return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('User', UserSchema);