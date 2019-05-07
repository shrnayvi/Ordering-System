const { verifyToken } = require('@utils/JWT');

async function checkToken(req, res, next) {
   const token = req.headers.token;
   if(token) {
      try { 
         const { context } = await verifyToken(token);
         req.role = context.role;
         next();
      } catch(e) {
         return apiResponse.invalidToken(res);
      }
   } else {
      return apiResponse.invalidToken(res);
   }
}

module.exports = checkToken;