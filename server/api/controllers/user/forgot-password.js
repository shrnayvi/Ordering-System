const crypto = require('crypto');
const User = require('@models/user');
const sendToken = require('@emails/user/forgot-password');
const { validateForgotPasswordInput } = require('@validations/user/forgot-password');

module.exports = async (req, res) => {
  const { error } = validateForgotPasswordInput(req.body);
  if (error) {
    return res.send({ status: 400, message: error.name, error: error.details });
  }

  try {
    const token = crypto.randomBytes(25).toString('hex');
    const user = await User.findOneAndUpdate({ email: req.body.email }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 1800000 }, { new: true });
    if (user) {
      sendToken({ email: req.body.email, token })
        .then(response => console.log('Forgot Password Token sent'))
        .catch(err => console.log(err))

      return apiResponse.success(res, { message: 'token_sent' });
    }
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}