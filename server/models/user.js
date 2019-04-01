const bcrypt   = require('bcrypt');
const mongoose = require('mongoose');

const { SOCIAL_LOGIN: method } = require('@config/constants');

const UserSchema = new mongoose.Schema(
   {
      method: {
         type: String,
         enum: method,
      },
      googleId: String,
      email: String,
      username: String,
      password: String,
      name: String,
      phone: String,
      status: Number,
      role: String,
      resetPasswordToken: String,
      resetPasswordExpires: Date,
   }, 
   { timestamps: true }
);


UserSchema.pre('save', async function() {
   try {
      let user = await this.constructor.findOne({ email: this.email });
      if(user) {
         return Promise.reject({ exists: true, message: 'User Already Exists' });
      }

      if(this.method === 'local' && this.password) {
         this.password = this.generateHash(this.password);
      }
   } catch(e) {
      return Promise.reject({ message: e.message });
   }
});

UserSchema.pre('findOneAndUpdate', function() {
   const password = this._update.password;
   if(password) {
      try {
         this._update.password= this.schema.methods.generateHash(password);
      } catch(e) {
         return Promise.reject({ message: e.message });
      }
   }
 });


UserSchema.methods.generateHash = function (password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.comparePassword = function (password, hash) {
   return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('User', UserSchema);