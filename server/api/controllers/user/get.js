const User = require('@models/user');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res) => {
   try {
      const { skip, limit, sort, query } = pagination.getPagingArgs(req.query);
      const users = await User.find({})
         .populate('avatar')
         .skip(skip)
         .limit(limit)
         .sort(sort);
      
      const total = await User.countDocuments({});
      const paging = pagination.getPagingResult(req.query, { total });

      return apiResponse.success(res, { message: 'fetched_user', data: { paging, users } });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}

exports.getById = async (req, res) => {
   try {
      const users = await User.findOne({ _id: req.params._id });
      return apiResponse.success(res, { message: 'fetched_user', data: users });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}