const Joi = require('joi');

/**
 * @param {Object} data - data for validation
 * @param {string} data.name - category name
 * @param {string} data.description - Category description
 */
module.exports = function (data) {
   const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
   };

   let { name, description } = data;
   return Joi.validate({ name, description }, schema);
}