const jwt = require('jsonwebtoken');
const { secretKey, jwtExpiration: exp } = require('@config/constants');

/**
 * Generate JWT Token
 * @param {Object} user - User 
 * @param {String} user._id - User's ID
 * @param {String} user.role - User's role 
 */
function generateToken(expiresAt, { _id, role }) {
   const payload = {
      exp: expiresAt,
      context: { 
         role,
         userId: _id,
      }
   };
   return jwt.sign(payload, secretKey);
}

/**
 * Verify JWT Token
 * @param {String} token - JWT Token
 */
function verifyToken(token) {
   return new Promise((ressolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
         if(err) {
            reject(err);
         } else {
            ressolve(decoded);
         }
      })
   })
}

module.exports = {
   generateToken,
   verifyToken
}