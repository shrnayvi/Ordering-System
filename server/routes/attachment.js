const express  = require('express');
// const multer   = require('multer');

// const extension = require('@utils/extension');
// const storage  = multer.diskStorage({
//    destination: function (req, file, cb) {
//       cb(null, `${__dirname}/../uploads`)
//    },
//    filename: function (req, file, cb) {
//       const mimetype = file.mimetype;
//       const ext = extension(mimetype);
//       if(mimetype) {
//          cb(new Error('mimetype not supported'));
//       } else {
//          cb(null, `${file}.${filename}-${Date.now()}./${ext}`);
//       }
//    }
// })

// const upload = multer({ storage }).single('attachment');

const router = module.exports = express.Router();

const authorize = require('@server/middlewares/authorize');
const checkToken = require('@server/middlewares/authenticate');
const {
   get, create, remove
} = require('@server/controllers/attachment');

router.get('/', get);
router.get('/:_id', get);
router.post('/', create);
router.delete(
   '/:_id', 
   [checkToken, authorize(cap['delete_attachment'])], 
   remove
);