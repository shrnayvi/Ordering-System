const express  = require('express');
const router = module.exports = express.Router();

const authorize = require('@server/middlewares/authorize');
const checkToken = require('@server/middlewares/authenticate');
const attachmentController = require('@server/controllers/attachment');

router.get('/', attachmentController.get);
router.get('/:name', attachmentController.get);
router.post('/', attachmentController.create)
router.delete(
   '/:_id', 
   [checkToken, authorize(cap['remove_attachment'])], 
   attachmentController.remove
);