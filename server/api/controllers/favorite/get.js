const Favorite = require('@models/favorite');
const pagination = require('@utils/pagination');


/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
module.exports = async (req, res, next) => {
  try {
    let query = {};
    if (req.params.user) {
      query = { user: req.params.user };
    }
    let { skip, limit } = pagination(req.query);
    const favorites = await Favorite.find(query)
      .populate('item', 'name description price')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc' });

    return apiResponse.success(res, { message: 'fetched_favorite', data: favorites });

  } catch (e) {
    return next(e);;
  }
}