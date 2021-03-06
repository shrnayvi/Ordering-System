const Order = require('@models/order');
const pagination = require('@utils/pagination');

/**
 * Get all orders or the user orders
 * @param {Object} [req.query] - Query Object
 * @param {Object} [req.params] - Request parameter
 * @param {String} [req.params.user] - User ID
 * @param {String} [req.query.status] - Order Status
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res, next) => {
  try {
    let query = {};
    if (req.params.user) {
      query = { user: req.params.user };
    }

    //TODO filter by date
    const { skip, limit, sort, query: queryParam } = pagination.getPagingArgs(req.query);
    query = { ...query, ...queryParam };

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
        .populate('user', { name: 1, email: 1, role: 1 })
        .populate('item', { createdAt: 0, updatedAt: 0 })
        .populate('event')
        .skip(skip)
        .limit(limit)
        .sort(sort);

    const paging = pagination.getPagingResult(req.query, { total });

    return apiResponse.success(res, { message: 'fetched_order', data: {paging, orders } });
  } catch (e) {
    return next(e);;
  }
}

/**
 * Get order by ID
 */
exports.getById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params._id })
      .populate('user', { name: 1, email: 1, role: 1 })
      .populate('item', { createdAt: 0, updatedAt: 0 })

    return apiResponse.success(res, { message: 'fetched_order', data: order });
  } catch (e) {
    return next(e);;
  }
}