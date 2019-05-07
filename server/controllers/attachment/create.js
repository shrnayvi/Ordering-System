const crypto   = require('crypto');
const Jimp     = require('jimp');
const multer   = require('multer');

const { create }  = require('@server/services/attachment');
const extension   = require('@utils/extension');
const images = require('@config/images');
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

         const allowedResize = ['jpeg', 'png'];
         const ext = extension(mimetype);
         apiResponse.success(res, { message: 'created_attachment', data: attachment });

         /* Resize only if image */
         if(allowedResize.includes(ext)) {
            for(let key in images) {
               Jimp.read(`${dest}${filename}`)
                  .then(image => {
                     return image
                        .resize(images[key].width, images[key].height)
                        .quality(70)
                        .write(`${dest}${key}-${filename}.${ext}`)
                  })
                  .catch(e => {
                     log(`Resizing Error: ${e.message}`);
                  })
            }
         }
      } catch (e) {
         return apiResponse.serverError(res, { data: e.message });
      }
   });
}