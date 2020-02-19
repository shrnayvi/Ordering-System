const Item = require('@models/item');
const validateInput = require('@validations/item/validate-input');

module.exports = async (req, res, next) => {
  const data = req.body,
    { error } = validateInput(data);

  try {
    if (error) {
      apiResponse.badRequest({ data: error });
    }

    const doc = new Item(data);
    const item = await doc.save();
    return apiResponse.success(res, { message: 'added_item', data: item });
  } catch (e) {
    return next(e);;
  }
}