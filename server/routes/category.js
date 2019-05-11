const router = module.exports = require('express').Router();

const authorize = require('@middlewares/authorize');
const checkToken = require('@middlewares/authenticate');
const categoryController = require('@controllers/category');
const { getMenuItems }= require('@controllers/item');

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