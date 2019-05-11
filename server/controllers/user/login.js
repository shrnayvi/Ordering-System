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
            const token = generateToken({ _id: userDoc._id, role: userDoc.role });
            return apiResponse.success(res, { message: 'login_successfull', data: { user: userDoc, token }});
         } 
      }

      return apiResponse.badRequest(res, { message: 'password_invalid' });

   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}