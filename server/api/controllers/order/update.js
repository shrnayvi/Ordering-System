const Order = require('@models/order');

module.exports = async (req, res) => {
  try {
    const data = req.body;
    if(!data.status) {
      return apiResponse.badRequest(res, { message: 'status_required' });
    }
    const order = await Order.findOneAndUpdate({ _id: req.params._id }, data, { new: true })
      .populate('user', { name: 1, email: 1, role: 1 })
      .populate('event', { name: 1, description: 1 });
    return apiResponse.success(res, { message: 'updated_order', data: order });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}