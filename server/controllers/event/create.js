const { create } = require('@services/event');
const createValidate = require('@validations/event/create');

module.exports = async (req, res) => {
  const data = req.body,
    { error } = createValidate(data);

  if (error) {
    return apiResponse.badRequest(res, { data: error });
  }

  try {
    const item = await create(data);
    return apiResponse.success(res, { message: 'added_event', data: item });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}