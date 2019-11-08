const { verifyToken } = require('@utils/JWT');
const User = require('@models/user');

module.exports = async (req, res) => {
   const token = req.body.token;
   try {
      const { context: { userId } } = await verifyToken(token);
      const user = await User.findOne({ _id: userId });
      if(!user) {
         apiResponse.notFound(res, { message: 'user_not_found' });
      }

      if(user.status === 1) {
         return apiResponse.conflict(res, { message: "email_already_verified" });
      }

      user.status = 1;
      await user.save();
      return apiResponse.success(res, { message: 'email_verified' })
   } catch(e) {
      console.log(e)
      return apiResponse.serverError(res);
   }
}