const { get, getBySlug, getByCategory } = require('./get');

module.exports = {
   get,
   getBySlug,
   getByCategory,
   create: require('./create'),
   update: require('./update'),
   remove: require('./remove'),
}