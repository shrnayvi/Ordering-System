const Joi = require('@hapi/joi');

/**
 * @param {Object} data - data for validation
 * @param {String} data.name - Item name
 * @param {String} data.description - Item description
 * @param {Number} data.priceLimit - Price Limit for the event
 */
module.exports = function (data) {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    priceLimit: Joi.number().required,
  };

  let { name, description, priceLimit } = data;
  return Joi.validate({ name, description, priceLimit }, schema, { abortEarly: false });
}