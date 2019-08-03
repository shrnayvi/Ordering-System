const { remove } = require('@services/user');

module.exports = async (req, res) => {
   try {
      let users = await remove({ _id: req.params._id })
         .select({
            _id: 1,
            role: 1,
            email: 1,
         })

      if (!users) {
         return apiResponse.notFound(res);
      }
      return apiResponse.success(res, { message: 'deleted_user', data: users });
   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}