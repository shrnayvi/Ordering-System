const { verifyToken } = require('@utils/JWT');
const User = require('@models/user');

module.exports = async (req, res, next) => {
   const token = req.body.token;
   try {
      const { context: { userId } } = await verifyToken(token);
      const user = await User.findOne({ _id: userId });
      if(!user) {
        logger.info({
          message: 'User not found',
        });
        apiResponse.notFound(res, { message: 'user_not_found' });
      }

      if(user.status === 1) {
        logger.info({
          message: 'User Already verified',
        }); 
        apiResponse.conflict({ message: "email_already_verified" });
      }

      user.status = 1;
      user.is_email_verified = 1;
      await user.save();
      return apiResponse.success(res, { message: 'email_verified' })
   } catch(e) {
    if(e.status === 500) {
      logger.error({
        message: 'Error fetching user, Operaton: getById()',
        data: e,
      });
    }
    return next(e);;
   }
}