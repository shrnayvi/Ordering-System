const Joi = require('joi');

function validateForgotPasswordInput(data) {
   const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
   }

   return Joi.validate(data, schema);
}

function validateResetPasswordInput(data) {
   const schema = {
      token: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
   }

   return Joi.validate(data, schema);
}

module.exports = {
   validateForgotPasswordInput,
   validateResetPasswordInput,
}