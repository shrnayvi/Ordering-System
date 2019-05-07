const fs = require('fs');
const { remove } = require('@server/services/attachment');

module.exports = async (req, res) => {
   try {
      let attachment = await remove({ _id: req.params._id });
      if (!attachment) {
         return apiResponse.notFound(res);
      }
      apiResponse.success(res, { message: 'deleted_attachment', data: attachment });

      /** Remove the file if exists */
      const {
         UPLOAD_PATH: dest 
      } = require('@config/constants');
      fs.unlink(`${dest}${attachment.filename}`, (err) => {
         if(err) {
            log('Error removing attachment', err.message);
         }
      });

   } catch (e) {
      return apiResponse.serverError(res, { data: e.message });
   }
}