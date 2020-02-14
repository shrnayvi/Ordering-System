const { verifyToken } = require('@utils/JWT');
const User = require('@models/user');

module.exports = async (req, res) => {
   const token = req.body.token;
   try {
      const { context: { userId } } = await verifyToken(token);
      const user = await User.findOne({ _id: userId });
      console.log(user.email, user.password, 'old');
      if(!user) {
         apiResponse.notFound(res, { message: 'user_not_found' });
      }

      if(user.status === 1) {
         return apiResponse.conflict(res, { message: "email_already_verified" });
      }

      user.status = 1;
      user.is_email_verified = 1;
      const savedUser = await user.save();
      console.log(savedUser.email, savedUser.password, 'new')
      return apiResponse.success(res, { message: 'email_verified' })
   } catch(e) {
      return apiResponse.serverError(res);
   }
}