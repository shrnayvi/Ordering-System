const User = require('@models/user');
const { validateResetPasswordInput } = require('@validations/user/forgot-password');

module.exports = async (req, res, next) => {
  const { error } = validateResetPasswordInput(req.body);
  if (error) {
    return res.send({ status: 400, message: error.name, error: error.details });
  }

  try {
    const token = req.body.token,
      password = req.body.password;

    const user = await User.findOneAndUpdate(
      { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } },
      { password, token: null, resetPasswordExpires: Date.now() - (60 * 60 * 24 * 30 * 1000) },
      { new: true },
    );

    if (!user) {
      apiResponse.badRequest({ message: 'token_expired' });
    }
    return apiResponse.success(res, { message: 'reset_password_successful', data: { _id: user._id } });
  } catch (e) {
    return next(e);;
  }
}