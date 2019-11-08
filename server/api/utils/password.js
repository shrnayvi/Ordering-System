const bcrypt = require('bcrypt');

/**
 * Hash password
 * @param {String} password Password
 */
function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
}

/**
 * Compared password with hashed one
 * @param {String} password Password to be compared
 * @param {String} password Hashed Password that needs to be compared
 */
function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  generateHash,
  comparePassword,
};