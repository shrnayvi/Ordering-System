const { get } = require('@server/services/user');
module.exports = async (req, res) => {
   let users;
   try {
      if(req.params._id) {
         users = await get({ _id: req.params._id });
      } else {
         users = await get({}, false);
      }
      return apiResponse.success(res, { message: 'fetched_user', data: users });
   } catch(e) {
      return apiResponse.serverError(res, { data: category });
   }
}