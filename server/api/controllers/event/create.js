const Event = require('@models/event');
const createValidate = require('@validations/event/create');

module.exports = async (req, res) => {
  const data = req.body,
    { error } = createValidate(data);

  if (error) {
    return apiResponse.badRequest(res, { data: error });
  }

  try {
    const doc = new Event(data);
    const event = await doc.save(data);
    return apiResponse.success(res, { message: 'added_event', data: event });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}