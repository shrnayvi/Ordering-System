const { verifyToken } = require('@utils/JWT');
async function checkToken(req, res, next) {
   const token = req.headers.token;
   if(token) {
      try { 
         verifyToken(token);
         next();
      } catch(e) {
         res.send({ status: 400, message: 'Invalid Token' });
      }
   } else {
      res.send({ status: 400, message: 'No Token Provided' })
   }
}

module.exports = checkToken;