const { get } = require('@server/services/item');

// exports.get = async(req, res) => {
module.exports = async(req, res) => {
   try {
      const items = await get({}, false)
         .populate('category');
      return apiResponse.success(res, { message: 'fetched_items', data: items });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}