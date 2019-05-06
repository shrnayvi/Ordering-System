const slugify = require('slugify');

module.exports = (name) => {
   return slugify(name, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true
   });
}