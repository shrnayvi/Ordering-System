const router = module.exports = require('express').Router();

const authorize = require('@server/middlewares/authorize');
const checkToken = require('@server/middlewares/authenticate');
const categoryController = require('@server/controllers/category');
const { getMenuItems }= require('@server/controllers/item');

/* Get items related to particular category */
router.get('/:_id/items', getMenuItems);

router.get('/:slug', categoryController.getBySlug);
router.get('/', categoryController.get);

router.post('/', 
   [checkToken, authorize(cap['add_category'])], 
   categoryController.create
);

router.put(
   '/:_id', 
   [checkToken, authorize(cap['edit_category'])], 
   categoryController.update
);

router.delete(
   '/:_id', 
   [checkToken, authorize(cap['remove_category'])], 
   categoryController.remove
);