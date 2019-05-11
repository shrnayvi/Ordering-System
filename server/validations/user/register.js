const Joi = require('joi');

/**
 * Validate the user registration
 * @param {Object} data - data for validation
 */
module.exports = function validateRegisterInput(data) {
   const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
      name: Joi.string(),
      phone: Joi.number().max(10),
   }

   let { username, email, password, name, phone } = data;
   return Joi.validate({ username, email, password, name, phone }, schema);
}
