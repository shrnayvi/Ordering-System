const Attachment = require('@models/attachment');
const pagination = require('@utils/pagination');

module.exports = async (req, res, next) => {
   let attachment;
   try {
      if(req.params._id) {
         attachment = await Attachment.findOne({ _id: req.params._id });
      } else if(req.params.name) {
         attachment = await Attachment.findOne({ filename: req.params.name });
      } else {
            // const { skip, limit } = pagination(req.query);
         const { skip, limit, sort, query } = pagination.getPagingArgs(req.query);
         attachment = await Attachment.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort);
      }
      return apiResponse.success(res, { message: 'fetched_attachment', data: attachment});
   } catch(e) {
      logger.error({ 
        message: 'Error fetching media',
        data: e,
      });
      return next(e);;
   }
}