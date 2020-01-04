const Joi = require('@hapi/joi');


/**
 * @param {Object} data - data for validation
 */
module.exports = function (data) {
  const schema = {
    event: Joi.string().length(24),
    orders: Joi.array().items(
      Joi.object({
        item: Joi.string().length(24).required(),
        quantity: Joi.number().required(),
      })
      .unknown(true)
    )
  }

  return Joi.validate(data, schema, { abortEarly: false });
}