const { verifyToken } = require('@utils/JWT');

async function checkToken(req, res, next) {
   const token = req.headers.token;
   if(token) {
      try { 
         const { context } = await verifyToken(token);
         req.role = context.role;
         next();
      } catch(e) {
         res.send({ status: 403, message: 'Invalid Token' });
      }
   } else {
      res.send({ status: 403, message: 'No Token Provided' })
   }
}

module.exports = checkToken;