const Category = require('@models/category');

module.exports = async (req, res, next) => {
   try {
      const category = await Category.findOneAndRemove({ _id: req.params._id });
      return apiResponse.success(res, { message: 'deleted_category', data: category });
   } catch(e) {
      return next(e);;
   }
}