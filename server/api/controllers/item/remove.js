const Item = require('@models/item');

module.exports = async(req, res, next) => {
   try {
      const item = await Item.findOneAndRemove({ _id: req.params._id });
      return apiResponse.success(res, { message: 'deleted_item', data: item });
   } catch(e) {
      return next(e);;
   }
}