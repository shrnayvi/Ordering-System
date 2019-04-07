const Joi = require('joi');

/**
 * Forgot password validation
 * @param {Object} data - data for validation
 * @param {String} data.email - User email
 */
function validateForgotPasswordInput(data) {
   const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
   }

   return Joi.validate(data, schema);
}

/**
 * Validation when resetting password
 * @param {Object} data - data for validation
 * @param {String} data.token - Reset token
 * @param {String} data.password - New password
 * @param {String} data.confirmPassword - Password confirmation
 */
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