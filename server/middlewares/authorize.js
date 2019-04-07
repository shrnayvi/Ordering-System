/**
 * Middleware for authorizing users in using particular resource.
 * @param {(String|String[])} roles - User role/roles accessing resource
 */
function authorize(roles = []) {
   if(typeof roles === 'string') {
      roles = [roles];
   }
   return (req, res, next) => {
      if(roles.length && roles.includes(req.role)) {
         next();
      } else {
         return res.send({ status: 403, message: 'Unauthorized' });
      }
   }
}

module.exports = authorize;