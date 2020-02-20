const User = require('@models/user');
const { validateResetPasswordInput } = require('@validations/user/forgot-password');

module.exports = async (req, res, next) => {
  const { error } = validateResetPasswordInput(req.body);
  try {
    if (error) {
      apiResponse.badRequest({ data: error });
    }

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

    logger.info({ message: 'Password reset successful' });
    return apiResponse.success(res, { message: 'reset_password_successful', data: { _id: user._id } });
  } catch (e) {
    logger.error({
      message: `Error resetting password, ${e.message}`,
      data: e,
    });
    return next(e);;
  }
}