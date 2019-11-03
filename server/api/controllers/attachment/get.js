const Attachment = require('@models/attachment');
const pagination = require('@utils/pagination');

module.exports = async (req, res) => {
   let attachment;
   try {
      if(req.params._id) {
         attachment = await Attachment.findOne({ _id: req.params._id });
      } else if(req.params.name) {
         attachment = await Attachment.findOne({ filename: req.params.name });
      } else {
         const { skip, limit } = pagination(req.query);
         attachment = await Attachment.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: 'desc' });
      }
      return apiResponse.success(res, { message: 'fetched_attachment', data: attachment});
   } catch(e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}