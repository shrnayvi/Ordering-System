const { get }              = require('@server/services/user');
const { generateToken }    = require('@utils/JWT');
const validateLoginInput   = require('@validations/user/login');

module.exports = async (req, res) => {
   try {
      const { error } = validateLoginInput(req.body);
      if (error) {
         return res.send({ status: 400, message: error.name, error: error.details });
      } 

      let userDoc = await get({ email: req.body.email }, true);
      if(!userDoc) {
         return res.send({ status: 404, message: 'User Not Found' });
      }

      if(userDoc.method === 'local') {
         let canLogin = userDoc.comparePassword(req.body.password, userDoc.password || '');

         if (canLogin) {
            const token = generateToken({ _id: userDoc._id });
            return res.send({ status: 200, message:'Successfully Login', data: { user: userDoc, token }});
         } 
      }

      return res.send({ status: 400, message: 'Invalid Password' });

   } catch (e) {
      return res.send({ status: 500, message: e.message });
   }
}