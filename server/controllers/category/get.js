const { aggregation }   = require('@services/category');
const { distinct }      = require('@services/category');
const pagination        = require('@utils/pagination');

/**
 * Fetch the categories with/without the hierarchy(upto 3 level deep)
 * @param {Object} req.query - Query parameter
 * @param {String} [req.query.get] - Query paramter for hierarchy('/category?get = hierarchical')
 * @param {string|number} [req.query.page] - Page Number
 * @param {string|number} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res) => {
   try {
      let { skip, limit } = pagination(req.query);
      let category;
      if(req.query.get === 'hierarchical') {
         let query = [
            { $match: { parent: { $exists: false } } },
            { $sort: { createdAt: -1 } },
            {
               $graphLookup: {
                  from: 'categories',
                  startWith: '$_id',
                  connectFromField: '_id',
                  connectToField: 'parent',
                  as: 'children',
                  maxDepth: 0,
               }
            },
            { $skip: skip },
            { $limit: limit },

         ]
         category = await aggregation(query);

         for(let i = 0, parentLength = category.length; i < parentLength; i++) {
            if(category[i].children.length) {
               for(let j = 0, childLength = category[i].children.length; j< childLength; j++) {
                  category[i].children[j].children = [];
                  let cat = await get({ parent: category[i].children[j]._id }, false);
                  category[i].children[j].children.push(...cat);
               }
            }
         }
      } else {
         category = await get({}, false);
      }

      return apiResponse.success(res, { message: 'fetched_category',data: category });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
};


exports.getBySlug = async (req, res) => {
   try {
      let category = await get({ slug: req.params.slug });
      return apiResponse.success(res, { message: 'fetched_category',data: category });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
};