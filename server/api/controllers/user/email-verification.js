const { verifyToken } = require('@utils/JWT');
const User = require('@models/user');

module.exports = async (req, res) => {
   const token = req.query.token;
   const publicURL = process.env.FRONTEND_URL;
   try {
      const { context: { userId } } = await verifyToken(token);
      const user = await User.findOneAndUpdate({ _id: userId }, { status: 1 }, { new: true });
      if(user) {
         return res.redirect(`${publicURL}login?verification=success`);
      }
      return res.redirect(`${publicURL}login?verification=error`)
   } catch(e) {
      return res.redirect(`${publicURL}login?verification=error`)
   }
}