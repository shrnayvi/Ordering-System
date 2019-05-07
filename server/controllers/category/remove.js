const { remove } = require('@server/services/category');

module.exports = async (req, res) => {
   try {
      const category = await remove({ _id: req.params._id });
      return apiResponse.success(res, { message: 'deleted_category', data: category });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}