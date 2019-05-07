const { update } = require('@server/services/user');

module.exports = async (req, res) => {
   try {
      let users = await update({ _id: req.params._id }, req.body);
      if (!users) {
         return apiResponse.notFound(res);
      }
      return apiResponse.success(res, { message: 'updated_user', data: users });
   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}