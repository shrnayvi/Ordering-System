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
    return next(e);;
  }
}