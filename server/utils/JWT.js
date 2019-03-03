const jwt = require('jsonwebtoken');
const { SECRET_KEY: secret } = require('@config/constants');

function generateToken(payload) {
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