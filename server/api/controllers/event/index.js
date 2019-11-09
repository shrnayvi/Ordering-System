const { get, getBySlug } = require('./get');

module.exports = {
  get,
  getBySlug,
  create: require('./create'),
  update: require('./update'),
  remove: require('./remove'),
}