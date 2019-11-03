const User = require('@models/user');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
exports.get = async (req, res) => {
   try {
      const { skip, limit } = pagination(req.query);
      const users = await User.find({})
         .skip(skip)
         .limit(limit)
         .sort({ createdAt: 'desc' });
      
      const total = await User.countDocuments({});

      return apiResponse.success(res, { message: 'fetched_user', data: { total, pageCount: Math.ceil(total / dataPerPage), users } });
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