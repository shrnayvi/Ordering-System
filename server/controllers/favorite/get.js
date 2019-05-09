const { get }     = require('@server/services/favorite');
const pagination  = require('@utils/pagination');

exports.get = async (req, res) => {
   try {
      let { skip, limit } = pagination(req.query);
      const favorites = await get({}, false)
         .populate('item', 'name description price')
         .skip(skip)
         .limit(limit)
         .sort({ createdAt: 'desc' });

      return apiResponse.success(res, { message: 'fetched_favorite', data: favorites });

   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}

exports.getByUser = async (req, res) => {
   try {
      let { skip, limit } = pagination(req.query);
      const favorites = await get({ user: req.params.user }, false)
         .populate('item', 'name description price')
         .skip(skip)
         .limit(limit)
         .sort({ createdAt: 'desc' });

      return apiResponse.success(res, { message: 'fetched_favorite', data: favorites });
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}