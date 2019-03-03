const _ = require('lodash');
const Joi = require('joi');
const { generateToken } = require('@utils/JWT');
const user = require('@server/services/user');

module.exports = {
   get: (params, isSingle) => {
      let query = {};
      query = _.merge(query, params);
      return user.get(query, isSingle);
   },

   create: (data) => {
      const schema = {
         username: Joi.string().alphanum().min(3).max(30).required(), 
         email: Joi.string().email({ minDomainAtoms: 2 }).required(),
         password: Joi.string().required(),
         name: Joi.string(),
         phone: Joi.number().max(10),
      }

      let { username, email, password, name, phone } = data;
      const { error }= Joi.validate({ username, email, password, name, phone }, schema);
      if(error) {
         return Promise.reject(error);
      } else {
         return user.create(data);
      }
   },

   update: (params, data) => {
      return user.update({ _id: params._id }, data);
   },

   delete: (params) => {
      return user.delete({ _id: params._id });
   },

   login: async (data) => {
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
         return { canLogin: false, message: 'Invalid Password' };
      }
   },
}
