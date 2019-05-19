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
         return apiResponse.notFound(res);
      }

      if(userDoc.method === 'local') {
         let canLogin = userDoc.comparePassword(req.body.password, userDoc.password || '');

         if (canLogin) {
            let { _id, role } = userDoc;
            const token = generateToken({ _id, role });
            return apiResponse.success(res, { message: 'login_successful', data: { user: { _id, role }, token }});
         } 
      }

      return apiResponse.badRequest(res, { message: 'password_invalid' });

   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}