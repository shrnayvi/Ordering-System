const Joi = require('@hapi/joi');

/**
 * @param {Object} data - data for validation
 * @param {String} data.name - Item name
 * @param {String} data.description - Item description
 * @param {Number} data.price - Item price 
 * @param {String} data.category - Which category item belongs to
 */
module.exports = function (data) {
   const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
   };

   let { name, description, price, category } = data;
   return Joi.validate({ name, description, price, category }, schema, { abortEarly: false });
}