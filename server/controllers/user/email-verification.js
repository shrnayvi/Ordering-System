const { verifyToken } = require('@utils/JWT');
const { update }  = require('@services/user');

const publicURL = '//localhost:3000/';

module.exports = async (req, res) => {
   const token = req.query.token;
   try {
      const { context: { userId } } = await verifyToken(token);
      const user = await update({ _id: userId }, { status: 1 });
      if(user) {
         return res.redirect(`${publicURL}login?verification=success`);
      }
      return res.redirect(`${publicURL}login?verification=error`)
   } catch(e) {
      return res.redirect(`${publicURL}login?verification=error`)
   }
}