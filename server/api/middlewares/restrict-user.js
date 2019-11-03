/**
 * Restriction for users to use only their resources
 * Resources can also be used by admin
 * Should only be used on the routes with _id parameter as a userID
 * @param req
 * @param res
 * @param next 
 * @param req.userId - Loggedin user
 * @param req.role - Loggedin user's role
 * @param req.params._id - Id of a user requesting the resource.
 */
module.exports = (req, res, next) => {
   const loggedInUser = req.userId,
      role = req.role,
      requestingUser = req.params._id;

   if(String(loggedInUser) === String(requestingUser) || role === 'admin') {
      next();
   } else {
      return apiResponse.unauthorized(res);
   }
}