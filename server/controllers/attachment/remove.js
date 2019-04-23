const fs = require('fs');
const { remove } = require('@server/services/attachment');

module.exports = async (req, res) => {
   try {
      let attachment = await remove({ _id: req.params._id });
      if (!attachment) {
         return res.send({ status: 404, message: 'Attachment Not Found', data: [] });
      }
      res.send({ status: 200, message: 'Attachment Deleted Successfully', data: attachment });

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
      return res.send({ status: 500, message: e.message });
   }
}