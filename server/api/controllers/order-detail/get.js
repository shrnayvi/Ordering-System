const OrderDetail = require('@models/order-detail');
const Order = require('@models/order');
const pagination = require('@utils/pagination');
const { get } = require('lodash');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res, next) => {
  const { skip, limit, sort, query: queryParam } = pagination.getPagingArgs(req.query);
  const { role, userId: user } = req;
  
  try {
    query = { order: req.params._id, ...queryParam};
    const found = await Order.findOne({ _id: req.params._id })
      .populate('user');

    const canCrud = _canCRUD('Read', found, { role, _id: user });
    if(!canCrud) {
      apiResponse.forbidden({});
    }

    const total = await OrderDetail.countDocuments(query),
      details = await OrderDetail.find(query)
        .populate('item')
        .populate({
          path: 'order',
          populate: [
            { path: 'user', select: '-password' },
            { path: 'item' },
          ]
        })
        .skip(skip)
        .limit(limit)
        .sort(sort);

    const paging = pagination.getPagingResult(req.query, { total });

    return apiResponse.success(res, { message: 'fetched_item', data: { paging, orderDetails: details } });
  } catch (e) {
    return next(e);;
  }
}

/**
 * @param {String} [req.params._id] - ID of the order detail
 */
exports.getById = async (req, res, next) => {
  try {
    const { role, userId: user } = req;
    const orderDetail = await OrderDetail.findOne({ _id: req.params._id })
    .populate('item')
    .populate({
      path: 'order',
      populate: [
        { path: 'user', select: '-password' },
        { path: 'item' },
      ]
    });

    if(!orderDetail) {
      apiResponse.notFound({ message: 'order_detail_not_found' });
    }

    const canCrud = _canCRUD('Read', orderDetail.order, { role, _id: user });
    if(!canCrud) {
      apiResponse.forbidden({});
    }

    return apiResponse.success(res, { message: 'fetched_order_detail', data: { orderDetail } });
  } catch (e) {
    return next(e);;
  }
}


/**
 * 
 * @param {String} CRUD 
 * @param {Object} found 
 * @param {String} loggedUser._id
 * @param {String} loggedUser.role
 * @returns {Boolean}
 */
function _canCRUD(CRUD, found, loggedUser) {
  const foundUser = get(found, 'user.id')

  switch(CRUD) {
    case 'Read':
      if(loggedUser.role === 'admin' || foundUser === loggedUser._id) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
}