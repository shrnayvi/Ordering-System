const { create } = require('@server/services/attachment');
const multer   = require('multer');

const extension = require('@utils/extension');
const storage  = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, `${__dirname}/../uploads`)
   },
   filename: function (req, file, cb) {
      const mimetype = file.mimetype;
      const ext = extension(mimetype);
      if(mimetype) {
         cb(new Error('mimetype not supported'));
      } else {
         cb(null, `${file}.${filename}-${Date.now()}./${ext}`);
      }
   }
})

const upload = multer().single('attachment');

module.exports = (req, res) => {
   upload(req, res, (err) => {
      if(err) {
         return res.send({err});
      }
      return res.send({ file: req.file });
   });
   // let {
   //    originalname,
   //    mimetype,
   //    filename
   // } = req.file;


   // try {
   //    let data = {  },
   //       attachment = await create(data);

   //    return res.send({ status: 200, message: 'Attachment Created Sucessfully', data: attachment });
   // } catch (e) {
   //    return res.send({ status: status, message: e.message });
   // }
      // res.send(req.file);
}