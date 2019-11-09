const { create, bulkCreate } = require('./create');
const { remove, removeById } = require('./remove');

module.exports = {
   get: require('./get'),
   create,
   bulkCreate,
   remove,
   removeById,
}