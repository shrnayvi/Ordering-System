const { get, getBySlug, getMenuItems} = require('./get');

module.exports = {
   get,
   getBySlug,
   getMenuItems,
   create: require('./create'),
   update: require('./update'),
   remove: require('./remove'),
}