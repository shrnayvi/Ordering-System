const { update } = require('@services/event');

module.exports = async (req, res) => {
  try {
    const data = req.body;
    const event = await update({ _id: req.params._id }, data);
    return apiResponse.success(res, { message: 'updated_event', data: event });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}