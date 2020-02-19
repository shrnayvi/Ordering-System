/**
 * Middleware for authorizing users in using particular resource.
 * @param {(String|String[])} roles - User role/roles accessing resource
 */
function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    try {
      if (roles.length && roles.includes(req.role)) {
        next();
      } else {
        apiResponse.forbidden({});
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = authorize;