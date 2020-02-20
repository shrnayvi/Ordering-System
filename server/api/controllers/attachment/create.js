const crypto = require('crypto');
const Jimp = require('jimp');
const multer = require('multer');

const Attachment = require('@models/attachment');
const extension = require('@utils/extension');
const images = require('@config/images');
const {
  uploadPath: dest
} = require('@config/constants');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype,
      ext = extension(mimetype),
      rand = crypto.randomBytes(3).toString('hex');
    if (ext) {
      cb(null, `${file.fieldname}-${rand}${Date.now()}.${ext}`);
    } else {
      cb({ error: 'mimetype_not_supported' });
    }
  }
})

module.exports = (req, res, next) => {
  const upload = multer({ storage }).single('attachment')
  upload(req, res, next, async (err) => {
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


      let data = { filename, originalname, size, status: 1, mimetype },
        doc = new Attachment(data),
        attachment = await doc.save();

      const allowedResize = ['jpeg', 'png'];
      const ext = extension(mimetype);

      /* Resize only if image */
      if (allowedResize.includes(ext)) {
        const promises = [];
        for (let key in images) {
          promises.push(
            Jimp.read(`${dest}${filename}`)
              .then(image => {
                return image
                  .resize(images[key].width, images[key].height)
                  .quality(70)
                  .write(`${dest}${key}-${filename}`)
              })
          );
        }

        await Promise.all(promises);
      }

      logger.info({ message: 'Media Created' });

      return apiResponse.success(res, { message: 'created_attachment', data: attachment });
    } catch (e) {
      logger.error({ 
        message: 'Error Creating Media',
        data: e,
      });
      return next(e);;
    }
  });
}