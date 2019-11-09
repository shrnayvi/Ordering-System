const Joi = require('@hapi/joi');

/**
 * @param {Object} data - data for validation
 * @param {String} data.item - Item name
 */
module.exports = function (data) {
  const schema = {
    item: Joi.required(),
    quantity: Joi.number().required(),
    event: Joi.string().required(),
  };

  let { item, quantity, event } = data;
  return Joi.validate({ item, quantity, event }, schema, { abortEarly: false });
}