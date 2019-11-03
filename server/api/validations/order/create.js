const Joi = require('@hapi/joi');


/**
 * @param {Object} data - data for validation
 */
module.exports = function (data) {
   const schema = {
      user: Joi.string().required(),
      item: Joi.string().required(),
      status: Joi.number().required(),
      quantity: Joi.number().required(),
   }; 

   let { user, item, status, quantity } = data;
   return Joi.validate({ user, item, status, quantity }, schema, { abortEarly: false });
}