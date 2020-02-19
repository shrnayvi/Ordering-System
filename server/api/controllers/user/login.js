const user                 = require('@models/user');
const { generateToken }    = require('@utils/JWT');
const pwd                  = require('@utils/password');
const validateLoginInput   = require('@validations/user/login');
const { jwtExpiration } = require('@config/constants');

module.exports = async (req, res, next) => {
   try {
      const { error } = validateLoginInput(req.body);
      if (error) {
         apiResponse.badRequest({ data: error.details });
      } 

      let userDoc = await user.findOne({ email: req.body.email })
         .select({ role: 1, password: 1, method: 1, is_email_verified: 1 })

      if(!userDoc) {
         apiResponse.badRequest({ message: 'invalid_email_password' });
      }

      if(userDoc.method !== 'local') {
         apiResponse.badRequest({ message: `invalid_email_password`});
      }

      console.log(userDoc.password, 'password');
      const canLogin = await pwd.comparePassword(req.body.password, userDoc.password || ''),
         { _id, role, is_email_verified } = userDoc;

      if(!is_email_verified) {
         apiResponse.badRequest({ message: 'email_not_verified' });
      }

      if(!canLogin) {
         apiResponse.badRequest({ message: 'invalid_email_password' });
      }

      const token = generateToken(jwtExpiration, { _id, role });
      return apiResponse.success(res, { message: 'login_successful', data: { user: { _id, role }, token }});
   } catch (e) {
      return next(e);;
   }
}