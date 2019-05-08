const router = module.exports = require('express').Router();

const authorize = require('@server/middlewares/authorize');
const checkToken = require('@server/middlewares/authenticate');
const itemController = require('@server/controllers/item');

router.get('/:slug', itemController.getBySlug);
router.get('/', itemController.get);

router.post('/', 
   [checkToken, authorize(cap['add_item'])], 
   itemController.create
);

router.put(
   '/:_id', 
   [checkToken, authorize(cap['edit_item'])], 
   itemController.update
);

router.delete(
   '/:_id', 
   [checkToken, authorize(cap['remove_item'])], 
   itemController.remove
);