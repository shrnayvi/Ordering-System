const _ = require('lodash');

const { generateToken } = require('@utils/JWT');
const user = require('@server/services/user');
const validateRegisterInput = require('@server_validations/user/register');
const validateLoginInput = require('@server_validations/user/login');

module.exports = {
   get: (params, isSingle) => {
      let query = {};
      query = _.merge(query, params);
      return user.get(query, isSingle);
   },

   register: async (data) => {
      const { error } = validateRegisterInput(data);
      if(error) {
         return Promise.reject(error);
      } else {
         try {
            let findUser = await user.get({ email }, true);
            if(findUser) {
               return Promise.reject({ emailExists: true });
            } else {
               return user.create(data);
            }
         } catch(e) {
            return e;
         }
      }
   },

   update: (params, data) => {
      return user.update({ _id: params._id }, data);
   },

   delete: (params) => {
      return user.delete({ _id: params._id });
   },

   login: async (data) => {
      try {
         const { error } = validateLoginInput(data);
         if(error) {
            return Promise.reject(error);
         } else {
            let userDoc = await user.get({ email: data.email }, true);
            let canLogin = userDoc.comparePassword(data.password, userDoc.password);
            if (canLogin) {
               const payload = {
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                  context: {
                     userId: userDoc._id
                  }
               };
               const token = generateToken(payload);
               return { user: userDoc, token, canLogin: true };
            } else {
               // return { canLogin: false, message: 'Invalid Password' };
               return Promise.reject({ canLogin: false, message: 'Invalid Password' });

            }
         }
      } catch(e) {
         return e
      }
   },
}
