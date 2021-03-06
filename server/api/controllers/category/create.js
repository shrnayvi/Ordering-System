const Category = require('@models/category');
const validateCategoryInput = require('@validations/category/validate-input');

module.exports = async (req, res, next) => {
  const data = req.body;

  const { error } = validateCategoryInput(data);
  try {
    if (error) {
      apiResponse.badRequest({ data: error });
    }
    const doc = new Category(data);
    const category = await doc.save();
    return apiResponse.success(res, { message: 'added_category', data: category });
  } catch (e) {
    return next(e);;
  }

} 