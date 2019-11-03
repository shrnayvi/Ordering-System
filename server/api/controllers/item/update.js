const Item = require('@models/item');

module.exports = async(req, res) => {
   try {
      const data = req.body;
      const item = await Item.findOneAndUpdate({ _id: req.params._id }, data, { new: true });
      return apiResponse.success(res, { message: 'updated_item', data: item });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}