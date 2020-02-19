const Event = require('@models/event');

module.exports = async (req, res, next) => {
  try {
    const data = req.body;
    const event = await Event.findOneAndUpdate({ _id: req.params._id }, data, { new: true });
    return apiResponse.success(res, { message: 'updated_event', data: event });
  } catch (e) {
    return next(e);;
  }
}