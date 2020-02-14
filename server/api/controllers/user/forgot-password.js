const crypto = require('@utils/crypto');
const User = require('@models/user');
const sendToken = require('@emails/user/forgot-password');
const { validateForgotPasswordInput } = require('@validations/user/forgot-password');
const { forgotPasswordSize, forgotPasswordExpiration } = require('@config/constants');

module.exports = async (req, res) => {
  const { error } = validateForgotPasswordInput(req.body);
  if (error) {
    return apiResponse.badRequest(res, { message: error.name, data: error.details })
  }

  try {
    const found = await User.findOne({ email: req.body.email });
    if(!found) {
      return apiResponse.notFound(res, { message: 'user_not_found' });
    }

    crypto.createRandomBytes(forgotPasswordSize)
      .then(token => {
        found['resetPasswordToken'] = token;
        found['resetPasswordExpires'] = forgotPasswordExpiration;
        console.log(resetPasswordExpires);
        return found.save()
          .then(_ => token)
      })
      .then(token => {
        sendToken({ email: req.body.email, token })
          .then(_ => console.log('Forgot Password Token sent'))
          .catch(err => console.log(err))

        return apiResponse.success(res, { message: 'token_sent' });
      })
      .catch(e => {
        return apiResponse.serverError(res, { data: e.message });
      })
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}