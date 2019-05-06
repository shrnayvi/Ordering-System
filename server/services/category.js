const Category = require('@server/models/category');

module.exports = {
   get: (query, single = true) => {
      if (single) {
         return Category.findOne(query);
      }
      return Category.find(query);
   },

   create: (data) => {
      let category = new Category(data);
      return category.save();
   },

   update: (query, data) => {
      return Category.findOneAndUpdate(query, data, { new: true });
   },

   remove: (query) => {
      return Category.findOneAndRemove(query);
   },

   /**
    * Gets the list of categories with the depth level of 0 (i.e. categories with their first children)
    * @param {Object} [query] - Query to match the document
    * @param {Object} [opts] - Fields for the graphlookup
    * @return {promise} - Returns list of categories with first level children
    */
   graphLookUp: (query = {}, opts = {}) => {
      if(!Object.keys(query).length) {
         query = { $match: { parent: { $exists: false } } };
      }

      if(!Object.keys(opts).length) {
         opts = {
            from: 'categories',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parent',
            as: 'children',
            maxDepth: 0,
         }
      }

      return Category
         .aggregate([
            query,
            { $graphLookup: { ...opts } },
         ])
   }
}