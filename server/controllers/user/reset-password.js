const crypto                           = require('crypto');
const { update }                       = require('@server/services/user');
const { validateResetPasswordInput }   = require('@validations/user/forgot-password');

module.exports = async (req, res) => {
   const { error, value } = validateResetPasswordInput(req.body);
   if (error) {
      return res.send({ status: 400, message: error.name, error: error.details });
   }

   try {
      const token = req.body.token,
         password= req.body.password;

      const user = await update(
         { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, 
         { password, token: null, resetPasswordExpires: Date.now() - (60 * 60 * 24 * 30 * 1000) }
      );

      if(!user) {
         return res.send({ status: 400, message: 'Token Expired', error: []});
      }
      return res.send({ status: 200, message: 'Reset Password Successfully', data: user });
   } catch(e) {
      return res.send({ status: 500, message: 'Server Error', error: e.message });
   }
}