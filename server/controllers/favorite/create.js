const { create } = require('@services/favorite');

module.exports = async (req, res) => {
   try {
      let user;
      if(!('user' in req.body)) {
         user = req.userId;
      }

      let item = req.body.item;

      const data = { user, item },
         favorite = await create(data);

      return apiResponse.success(res, { message: 'added_favorite', data: favorite });
   } catch(e) {
      let error = { data: e.message }
      if('error' in e) {
         error['message'] = e.error;
         return apiResponse.badRequest(res, { ...error });
      }
      return apiResponse.serverError(res, { ...error });
   }
}