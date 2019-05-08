const { get } = require('@server/services/item');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {string} [req.query.page] - Page Number Query parameter
 * @param {string} [req.query.size] - Number of data to fetch
 */
exports.get = async(req, res) => {
   try {
      const { skip, limit } = pagination(req.query),
         items = await get({}, false)
            .populate('category')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: 'desc' });

      return apiResponse.success(res, { message: 'fetched_item', data: items });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}


/**
 * Get the item by slug
 * @param {Object} [req.param] - Query Object
 * @param {string} [req.params.slug] - Food Item slug
 */
exports.getBySlug = async(req, res) => {
   try {
      const item = await get({ slug: req.params.slug })
         .populate('category');
      return apiResponse.success(res, { message: 'fetched_item', data: item });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}