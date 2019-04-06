const Joi = require('joi');

module.exports = function validateRegisterInput(data) {
   const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
   }

   let { email, password } = data;
   return Joi.validate({ email, password }, schema);
}