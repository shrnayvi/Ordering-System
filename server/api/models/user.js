const mongoose = require('mongoose');

const {
  socialLogin: method,
  roles,
} = require('@config/constants');

const pwd = require('@utils/password');

/**
 * Status: { -1: pending, 0: blocked, 1: active, 2: inactive };
 */
const UserSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: method,
    },
    role: {
      type: String,
      enum: roles,
      default: 'customer',
    },
    googleId: String,
    email: String,
    username: String,
    password: String,
    name: String,
    phone: Number,
    status: Number,
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attachment'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

UserSchema.pre('findOneAndUpdate', async function () {
  const password = this._update.password;
  if (password) {
    try {
      this._update.password = await pwd.generateHash(password);
    } catch (e) {
      return Promise.reject({ message: e.message });
    }
  }
});


module.exports = mongoose.model('User', UserSchema);