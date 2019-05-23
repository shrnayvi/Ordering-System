const Joi = require('joi');

/**
 * Validate the user registration
 * @param {Object} data - data for validation
 */
module.exports = function validateRegisterInput(data) {
   const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.number().required(),
   }

   let { email, password, name, phone } = data;
   return Joi.validate({ email, password, name, phone }, schema, { abortEarly: false });
}
