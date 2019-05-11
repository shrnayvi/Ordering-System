const { remove } = require('@services/user');

module.exports = async (req, res) => {
   try {
      let users = await remove({ _id: req.params._id });
      if (!users) {
         return apiResponse.notFound(res);
      }
      return apiResponse.success(res, { message: 'deleted_user', data: users });
   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}