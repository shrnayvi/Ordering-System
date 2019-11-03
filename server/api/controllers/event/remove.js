const Event = require('@models/event');

module.exports = async (req, res) => {
  try {
    const event = await Event.findOneAndRemove({ _id: req.params._id });
    return apiResponse.success(res, { message: 'deleted_event', data: event });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}