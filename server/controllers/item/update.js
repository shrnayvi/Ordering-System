const { update } = require('@services/item');

module.exports = async(req, res) => {
   try {
      const data = req.body;
      const item = await update({ _id: req.params._id }, data);
      return apiResponse.success(res, { message: 'updated_item', data: item });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}