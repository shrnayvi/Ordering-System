const crypto = require('crypto');
const { update } = require('@server/services/user');
const sendToken = require('@emails/user/forgot-password');
const { validateForgotPasswordInput } = require('@validations/user/forgot-password');

module.exports = async (req, res) => {
   const { error } = validateForgotPasswordInput(req.body);
   if (error) {
      return res.send({ status: 400, message: error.name, error: error.details });
   } 

   try {
      const token = crypto.randomBytes(25).toString('hex');
      const user = await update({ email: req.body.email }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 1800000 });
      if(user) {
         let emailResponse = await sendToken({ email: req.body.email, token });
         if('error' in emailResponse) {
            return apiResponse.serverError(res, { data: e.message });
         }
         return apiResponse.success(res, { message: 'token_sent' });
      }
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}