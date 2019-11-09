const { get, getById } = require('./get');
const { create, bulkCreate } = require('./create');

module.exports = {
  get,
  getById,
  create: create,
  bulkCreate: bulkCreate,
  update: require('./update'),
}