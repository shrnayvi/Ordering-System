const Category = require('@server/models/category');

module.exports = {
   count: query => {
      return Category.countDocuments(query);
   },

   get: (query, single = true) => {
      if (single) {
         return Category.findOne(query);
      }
      return Category.find(query);
   },

   distinct: (field, query) => {
      return Category.distinct(field, query);
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
    * Aggregation query
    * @param {Object} [opts] - Aggregation Pipeline(if not provided then gets the list of categories with the depth level of 0 (i.e. categories with their first children))
    * @return {promise} - Returns aggregated result
    */
   aggregation: (opts = []) => {
      if(!opts.length) {
         opts = [
            { $sort: { createdAt: -1 } },
            { $match: { parent: { $exists: false } } },
            {
               $graphLookup: {
                  from: 'categories',
                  startWith: '$_id',
                  connectFromField: '_id',
                  connectToField: 'parent',
                  as: 'children',
                  maxDepth: 0,
               }
            }
         ];
      }

      return Category.aggregate(opts);
   }
}