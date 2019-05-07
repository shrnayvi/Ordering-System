const { get }           = require('@server/services/category');
const { graphLookUp }   = require('@server/services/category');

/**
 * Fetch the categories with/without the hierarchy(upto 3 level deep)
 * @param {Object} req - Request object
 * @param {string} [req.query.get] - Query paramter for hierarchy('/category?get = hierarchical')
 */
exports.get = async (req, res) => {
   try {
      let category;
      if(req.query.get === 'hierarchical') {
         category = await graphLookUp();
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