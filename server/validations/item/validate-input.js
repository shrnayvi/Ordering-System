const Joi = require('joi');

/**
 * @param {Object} data - data for validation
 * @param {string} data.name - Item name
 * @param {string} data.description - Item description
 * @param {number} data.price - Item price 
 * @param {string} data.category - Which category item belongs to
 */
module.exports = function (data) {
   const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
   };

   let { name, description, price, category } = data;
   return Joi.validate({ name, description, price, category }, schema);
}