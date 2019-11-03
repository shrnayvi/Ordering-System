const express  = require('express');
const router = module.exports = express.Router();

const authorize = require('@middlewares/authorize');
const checkToken = require('@middlewares/authenticate');
const attachmentController = require('@controllers/attachment');

router.get('/', attachmentController.get);
router.get('/:name', attachmentController.get);
router.post('/', attachmentController.create)
router.delete(
   '/:_id', 
   [checkToken, authorize(cap['remove_attachment'])], 
   attachmentController.remove
);