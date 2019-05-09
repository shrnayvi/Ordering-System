const { get, getByUser } = require('./get');

module.exports = {
   get,
   getByUser,
   create: require('./create'),
   remove: require('./remove'),
}