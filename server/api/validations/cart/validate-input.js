const Joi = require('@hapi/joi');

/**
 * @param {Object} data - data for validation
 * @param {String} data.item - Item name
 */
module.exports = function (data) {
  const schema = {
    item: Joi.required(),
    quantity: Joi.number().required(),
  };

  let { item, quantity } = data;
  return Joi.validate({ item, quantity }, schema, { abortEarly: false });
}