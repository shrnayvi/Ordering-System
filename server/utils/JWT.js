const jwt = require('jsonwebtoken');
const { SECRET_KEY: secret, JWT_EXPIRATION: exp } = require('@config/constants');

function generateToken({ _id, role }) {
   const payload = {
      exp,
      context: { 
         role,
         userId: _id,
      }
   };
   return jwt.sign(payload, secret);
}

function verifyToken(token) {
   return new Promise((ressolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
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