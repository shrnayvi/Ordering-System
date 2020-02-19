const { verifyToken } = require('@utils/JWT');

async function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      apiResponse.unAuthorized({})(res);
    }

    const token = authHeader.split(" ")[1];
    const { context } = await verifyToken(token);
    req.userId = context.userId;
    req.role = context.role;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = checkToken;