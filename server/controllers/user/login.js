const { get }              = require('@services/user');
const { generateToken }    = require('@utils/JWT');
const validateLoginInput   = require('@validations/user/login');

module.exports = async (req, res) => {
   try {
      const { error } = validateLoginInput(req.body);
      if (error) {
         return apiResponse.badRequest(res, { data: error.details });
      } 

      let userDoc = await get({ email: req.body.email }, true);
      if(!userDoc) {
         return apiResponse.notFound(res, { message: 'user_not_found' });
      }

      if(userDoc.method === 'local') {
         const canLogin = userDoc.comparePassword(req.body.password, userDoc.password || ''),
            { _id, role, status } = userDoc;

         if(status === -1) {
            return apiResponse.badRequest(res, { message: 'email_not_verified' });
         }
         if (canLogin) {
            const token = generateToken({ _id, role });
            return apiResponse.success(res, { message: 'login_successful', data: { user: { _id, role }, token }});
         } 
      }

      return apiResponse.badRequest(res, { message: 'password_invalid' });

   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}