const User = require('@models/user');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res, next) => {
  try {
    const { skip, limit, sort, query } = pagination.getPagingArgs(req.query);
    const users = await User.find(query)
      .populate('avatar')
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const total = await User.countDocuments(query);
    const paging = pagination.getPagingResult(req.query, { total });

    return apiResponse.success(res, { message: 'fetched_user', data: { paging, users } });
  } catch (e) {
    logger.error({
      message: 'Error fetching user, Operaton: get()',
      data: e,
    }); 
    return next(e);;
  }
}

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      apiResponse.notFound({ message: 'user_not_found' });
    }

    return apiResponse.success(res, { message: 'fetched_user', data: user });
  } catch (e) {
    logger.error({
      message: 'Error fetching user, Operaton: getById()',
      data: e,
    });
    return next(e);;
  }
}