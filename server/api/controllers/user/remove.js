const User = require('@models/user');

module.exports = async (req, res, next) => {
  try {
    let users = await User.findOneAndRemove({ _id: req.params._id })
      .select({
        _id: 1,
        role: 1,
        email: 1,
      })

    if (!users) {
      apiResponse.notFound({});
    }
    return apiResponse.success(res, { message: 'deleted_user', data: users });
  } catch (e) {
    return next(e);;
  }
}