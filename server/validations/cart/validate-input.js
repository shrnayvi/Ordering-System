const Joi = require('@hapi/joi');

/**
 * @param {Object} data - data for validation
 * @param {String} data.item - Item name
 */
module.exports = function (data) {
  const schema = {
    item: Joi.required(),
  };

  let { item } = data;
  return Joi.validate({ item }, schema, { abortEarly: false });
}