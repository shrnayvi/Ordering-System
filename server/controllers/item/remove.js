const { remove } = require('@services/item');

module.exports = async(req, res) => {
   try {
      const item = await remove({ _id: req.params._id });
      return apiResponse.success(res, { message: 'deleted_item', data: item });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}