const Joi = require('@hapi/joi');

/**
 * @param {Object} data - data for validation
 * @param {String} data.name - Item name
 * @param {String} data.description - Item description
 */
module.exports = function (data) {
   const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
   };

   let { name, description } = data;
   return Joi.validate({ name, description }, schema, { abortEarly: false });
}