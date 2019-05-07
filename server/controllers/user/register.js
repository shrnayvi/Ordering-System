const { create }              = require('@server/services/user');
const validateRegisterInput   = require('@validations/user/register');

module.exports = async (req, res) => {
   const { error } = validateRegisterInput(req.body);
   if (error) {
      res.send({ status: 400, message: error.name, error: error.details });
   } else {
      try {
         let data = { ...req.body, method: 'local'},
            newUser = await create(data);

         return apiResponse.success(res, { message: 'created_user', data: newUser });
      } catch (e) {
         if('exists' in e && e.exists) {
            return apiResponse.badRequest(res, { data: e.message });
         }
         return apiResponse.serverError(res, { data: e.message });
      }
   }
}