const { get, getById, getMenuItems} = require('./get');

module.exports = {
   get,
   getById,
   getMenuItems,
   create: require('./create'),
   update: require('./update'),
   remove: require('./remove'),
}