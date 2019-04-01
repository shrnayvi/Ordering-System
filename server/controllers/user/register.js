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

         return res.send({ status: 200, message: 'User Created Sucessfully', data: newUser });
      } catch (e) {
         let status = 500,
            message = 'Server Error';
         if('exists' in e && e.exists) {
            status = 400;
            message = e.message;
         }
         return res.send({ status: status, message, error: e.message });
      }
   }
}