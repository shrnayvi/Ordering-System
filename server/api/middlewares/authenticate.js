const { verifyToken } = require('@utils/JWT');

async function checkToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   if(!authHeader || !authHeader.startsWith('Bearer ')) {
      return apiResponse.invalidToken(res);
   }

   try {
      const token = authHeader.split(" ")[1];
      const { context } = await verifyToken(token);
      req.userId = context.userId;
      req.role = context.role;
      next();
   } catch(e) {
      return apiResponse.invalidToken(res);
   }
}

module.exports = checkToken;