const User = require('@models/user');

module.exports = async (req, res, next) => {
  let _id = req.params._id;
  if (!_id) {
    _id = req.userId;
  }
  try {
    let users = await User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
    if (!users) {
      apiResponse.notFound({});
    }
    return apiResponse.success(res, { message: 'updated_user', data: users });
  } catch (e) {
    if(e.status === 404) {
      logger.warn({ message: 'User not found' });
    } else {
      logger.error({
        message: 'Error resetting password',
        data: e,
      });
    }
    return next(e);;
  }
}