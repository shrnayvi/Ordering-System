const Attachment = require('@server/models/attachment');

module.exports = {
   get: (query, single) => {
      if (single) {
         return Attachment.findOne(query);
      } else {
         return Attachment.find(query);
      }
   },
   create: (data) => {
      let attachment = new Attachment(data);
      return attachment.save();
   },

   delete: (query) => {
      return Attachment.findOneAndRemove(query);
   },
}