const Event = require('@models/event');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res) => {
  try {
    const { skip, limit } = pagination(req.query),
      total = await Event.countDocuments({}),
      events = await Event.find({})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 'desc' });

    return apiResponse.success(res, { message: 'fetched_item', data: { total, pageCount: Math.ceil(total / dataPerPage), events } });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}


/**
 * Get the item by slug
 * @param {Object} [req.param] - Query Object
 * @param {String} [req.params.slug] - Food Item slug
 */
exports.getBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    return apiResponse.success(res, { message: 'fetched_event', data: event });
  } catch (e) {
    return apiResponse.serverError(res, { data: e.message });
  }
}