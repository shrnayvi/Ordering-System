const Event = require('@models/event');
const createValidate = require('@validations/event/create');

module.exports = async (req, res, next) => {
  const data = req.body,
    { error } = createValidate(data);

  if (error) {
    apiResponse.badRequest({ data: error });
  }

  try {
    const doc = new Event(data);
    const event = await doc.save(data);
    return apiResponse.success(res, { message: 'added_event', data: event });
  } catch (e) {
    return next(e);;
  }
}