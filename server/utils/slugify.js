const slugify = require('slugify');

/**
 * @param {String} name Name to generate the slug
 * @returns {string} Returns the generated slug
 */
module.exports = (name) => {
   return slugify(name, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true
   });
}