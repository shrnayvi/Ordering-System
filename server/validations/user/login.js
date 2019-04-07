const Joi = require('joi');

/**
 * @param {Object} data - data for validation
 */
module.exports = function validateLoginInput(data) {
   const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
   }

   let { email, password } = data;
   return Joi.validate({ email, password }, schema);
}