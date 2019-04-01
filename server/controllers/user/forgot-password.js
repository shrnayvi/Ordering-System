const crypto                        = require('crypto');
const { update }                    = require('@server/services/user');
const { validateForgotPasswordInput }   = require('@validations/user/forgot-password');

module.exports = async (req, res) => {
   const { error } = validateForgotPasswordInput(req.body);
   if (error) {
      return res.send({ status: 400, message: error.name, error: error.details });
   } 

   try {
      const token = crypto.randomBytes(25).toString('hex');
      const user = await update({ email: req.body.email }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 1800000 });
      if(user) {
         return res.send({ status: 200, message: 'Token Sent', data: token });
      }
   } catch(e) {
      return res.send({ status: 500, message: 'Server Error', error: e.message });
   }
}