const Event = require('@models/event');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res, next) => {
  try {
    const { skip, limit, sort, query } = pagination.getPagingArgs(req.query),
      total = await Event.countDocuments(query),
      events = await Event.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);

    const paging = pagination.getPagingResult(req.query, { total });
    return apiResponse.success(res, { message: 'fetched_item', data: { paging, events } });
  } catch (e) {
    return next(e);;
  }
}


/**
 * Get the item by slug
 * @param {Object} [req.param] - Query Object
 * @param {String} [req.params.slug] - Food Item slug
 */
exports.getBySlug = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    return apiResponse.success(res, { message: 'fetched_event', data: event });
  } catch (e) {
    return next(e);;
  }
}