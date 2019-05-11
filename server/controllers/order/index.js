const { get, getById } = require('./get');

module.exports = {
   get,
   getById,
   create: require('./create'),
   update: require('./update'),
}