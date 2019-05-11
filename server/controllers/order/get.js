const { get } = require('@server/services/order');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async(req, res) => {
   try {
      let query = {};
      if(req.params.user) {
         query = { user: req.params.user };
      }

      const { skip, limit } = pagination(req.query),
         orders = await get(query, false)
            .populate('user')
            .populate('item')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: 'desc' });

      return apiResponse.success(res, { message: 'fetched_order', data: orders });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}

/**
 * Get order by ID
 */
exports.getById = async(req, res) => {
   try {
      const order = await get({ _id: req.params._id })
         .populate('user')
         .populate('item')

      return apiResponse.success(res, { message: 'fetched_order', data: order });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}