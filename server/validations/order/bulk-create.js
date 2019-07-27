const Joi = require('@hapi/joi');


/**
 * @param {Object} data - data for validation
 */
module.exports = function (data) {
  const schemaType = Joi.object().keys({
    user: Joi.string().length(24),
    item: Joi.string().length(24),
    quantity: Joi.number().required(),
  })
  .unknown(true);

  const schema = Joi.array().items(schemaType);

  console.log(data, 'data')
  return Joi.validate(data, schema, { abortEarly: false });
}