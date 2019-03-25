const bcrypt   = require('bcrypt');
const mongoose = require('mongoose');

const { SOCIAL_LOGIN: method } = require('@config/constants');

const UserSchema = new mongoose.Schema({
   method: {
      type: String,
      enum: method,
   },
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


UserSchema.pre("save", async function() {
   let user = await this.constructor.findOne({ email: this.email });
   if(user) {
      return Promise.reject({ exists: true, message: 'User Already Exists' });
   }

   if(this.method === 'local') {
      this.password = this.generateHash(this.password);
   }
});

UserSchema.methods.generateHash = function (password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.comparePassword = function (password, hash) {
   return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('User', UserSchema);
