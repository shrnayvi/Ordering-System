const { update } = require('@services/order');

module.exports = async(req, res) => {
   try {
      const data = req.body;
      const order = await update({ _id: req.params._id }, data);
      return apiResponse.success(res, { message: 'updated_order', data: order });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}