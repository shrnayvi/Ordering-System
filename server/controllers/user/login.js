const { get }              = require('@services/user');
const { generateToken }    = require('@utils/JWT');
const validateLoginInput   = require('@validations/user/login');

module.exports = async (req, res) => {
   try {
      const { error } = validateLoginInput(req.body);
      if (error) {
         return apiResponse.badRequest(res, { data: error.details });
      } 

      let userDoc = await get({ email: req.body.email }, true)
         .select({ role: 1, status: 1, password: 1, method: 1 })
      if(!userDoc) {
         return apiResponse.notFound(res, { message: 'user_not_found' });
      }

      if(userDoc.method !== 'local') {
         return apiResponse.badRequest(res, { message: `${userDoc.method}_login`});
      }

      const canLogin = userDoc.comparePassword(req.body.password, userDoc.password || ''),
         { _id, role, status } = userDoc;

      if(status === -1) {
         return apiResponse.badRequest(res, { message: 'email_not_verified' });
      }

      if(!canLogin) {
         return apiResponse.badRequest(res, { message: 'password_invalid' });
      }

      const token = generateToken({ _id, role });
      return apiResponse.success(res, { message: 'login_successful', data: { user: { _id, role }, token: `Bearer ${token}` }});


   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}