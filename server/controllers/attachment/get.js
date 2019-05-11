const { get } = require('@services/attachment');
const pagination = require('@utils/pagination');

module.exports = async (req, res) => {
   let attachment;
   try {
      if(req.params._id) {
         attachment = await get({ _id: req.params._id }, true);
      } else if(req.params.name) {
         attachment = await get({ filename: req.params.name }, true);
      } else {
         const { skip, limit } = pagination(req.query);
         attachment = await get({}, false)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: 'desc' });
      }
      return apiResponse.success(res, { message: 'fetched_attachment', data: attachment});
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}