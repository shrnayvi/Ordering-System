const { get } = require('@server/services/user');
const pagination = require('@utils/pagination');

/**
 * @param {Object} [req.query] - Query Object
 * @param {String} [req.query.page] - Page Number Query parameter
 * @param {String} [req.query.size] - Number of data to fetch
 */
module.exports = async (req, res) => {
   let users;
   try {
      if(req.params._id) {
         users = await get({ _id: req.params._id });
      } else {
         const { skip, limit } = pagination(req.query);
         users = await get({}, false)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: 'desc' });

      }
      return apiResponse.success(res, { message: 'fetched_user', data: users });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}