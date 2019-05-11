const { get }     = require('@server/services/favorite');
const pagination  = require('@utils/pagination');


/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
module.exports = async (req, res) => {
   try {
      let query = {};
      if(req.params.user) {
         query = { user: req.params.user };
      }
      let { skip, limit } = pagination(req.query);
      const favorites = await get(query, false)
         .populate('item', 'name description price')
         .skip(skip)
         .limit(limit)
         .sort({ createdAt: 'desc' });

      return apiResponse.success(res, { message: 'fetched_favorite', data: favorites });

   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}