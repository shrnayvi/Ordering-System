const { get, getById } = require('./get');
module.exports = {
   emailVerification : require('./email-verification'),
   forgotPassword    : require('./forgot-password'),
   get               : get,
   getById           : getById,
   login             : require('./login'),
   register          : require('./register'),
   remove            : require('./remove'),
   resetPassword     : require('./reset-password'),
   update            : require('./update'),
}