const Joi = require('joi');

/**
 * @param {Object} data - data for validation
 */
module.exports = function validateRegisterInput(data) {
   const schema = {
      username: Joi.string().alphanum().min(3).max(30).required(), 
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
      name: Joi.string(),
      phone: Joi.number().max(10),
   }

   let { username, email, password, name, phone } = data;
   return Joi.validate({ username, email, password, name, phone }, schema);
}
