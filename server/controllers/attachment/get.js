const { get } = require('@server/services/attachment');

module.exports = async (req, res) => {
   let attachment;
   try {
      if(req.params._id) {
         attachment = await get({ _id: req.params._id }, true);
      } else if(req.params.name) {
         attachment = await get({ filename: req.params.name }, true);
      } else {
         attachment = await get({}, false);
      }
      return apiResponse.success(res, { message: 'fetched_attachment', data: attachment});
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}