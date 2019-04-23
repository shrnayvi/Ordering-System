const multer   = require('multer');
const crypto   = require('crypto');

const { create }  = require('@server/services/attachment');
const extension   = require('@utils/extension');
const { images }  = require('@config/images');
const { 
   UPLOAD_PATH: dest 
} = require('@config/constants');


const storage  = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, dest)
   },
   filename: function (req, file, cb) {
      const mimetype = file.mimetype,
         ext = extension(mimetype),
         rand = crypto.randomBytes(3).toString('hex');
      if(ext) {
         cb(null, `${file.fieldname}-${rand}${Date.now()}.${ext}`);
      } else {
         cb({error: 'mimetype_not_supported'});
      }
   }
})

module.exports = (req, res) => {
   const upload = multer({ storage }).single('attachment')
   upload(req, res, async (err) => {
      if (err) {
         return res.send(err);
      }
      try {
         let {
            originalname,
            mimetype,
            filename,
            size,
         } = req.file;


         let data = { filename, originalname, size, status: 1, mimetype},
            attachment = await create(data);

         return res.send({ status: 200, message: 'Attachment Created Sucessfully', data: attachment });
      } catch (e) {
         return res.send({ status: status, message: e.message });
      }
   });
}