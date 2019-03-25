const _ = require('lodash');

const { generateToken } = require('@utils/JWT');
const user = require('@server/services/user');
const validateRegisterInput = require('@server_validations/user/register');
const validateLoginInput = require('@server_validations/user/login');

module.exports = {
   get: async (req, res) => {
      let users;
      try {
         if(req.params._id) {
            users = await user.get({ _id: req.params._id }, true);
         } else {
            users = await user.get({}, false);
         }
         return res.send({ status: 200, message: 'Fetched Users', data: users });
      } catch(e) {
         return res.send({ status: 500, message: 'Server Error' });
      }
   },

   login: async (req, res) => {
      try {
         const { error } = validateLoginInput(req.body);
         if (error) {
            return res.send({ status: 400, message: error.name, error: error.details });
         } 

         let userDoc = await user.get({ email: req.body.email }, true);
         if(!userDoc) {
            return res.send({ status: 404, message: 'User Not Found' });
         }

         if(userDoc.method === 'local') {
            let canLogin = userDoc.comparePassword(req.body.password, userDoc.password);

            if (canLogin) {
               const token = generateToken({ _id: userDoc._id });
               return res.send({ status: 200, message:'Successfully Login', data: { user: userDoc, token }});
            } 
         }

         res.send({ status: 400, message: 'Invalid Password' });

      } catch (e) {
         res.send({ status: 500, message: 'Server Error', });
      }
   },


   register: async (req, res) => {
      const { error } = validateRegisterInput(req.body);
      if (error) {
         res.send({ status: 400, message: error.name, error: error.details });
      } else {
         try {
            let data = { ...req.body, method: 'local'},
               newUser = await user.create(data);
            res.send({ status: 200, message: 'User Created Sucessfully', data: newUser });
         } catch (e) {
            let status = 500;
            if('exists' in e && e.exists) {
               status = 400;
            }
            res.send({ status: status, message: e.message });
         }
      }
   },

   update: async (req, res) => {
      try {
         let users = await user.update({ _id: req.params._id }, req.body);
         if (!users) {
            return res.send({ status: 404, message: 'User Not Found', data: [] });
         }
         res.send({ status: 200, message: 'User Updated Successfully', data: users });
      } catch (e) {
         res.send({ status: 500, message: 'Server Error', error: [] });
      }
   },

   delete: async (req, res) => {
      try {
         let users = await user.delete({ _id: req.params._id });
         if (!users) {
            return res.send({ status: 404, message: 'User Not Found', data: [] });
         }
         res.send({ status: 200, message: 'User Deleted Successfully', data: users });
      } catch (e) {
         res.send({ status: 500, message: e.message });
      }
   },

}
