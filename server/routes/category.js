const router = module.exports = require('express').Router();

const authorize = require('@server/middlewares/authorize');
const checkToken = require('@server/middlewares/authenticate');
const categoryController = require('@server/controllers/category');

router.get('/:slug', categoryController.getBySlug);
router.get('/', categoryController.get);

router.post('/', 
   [checkToken, authorize(cap['create_category'])], 
   categoryController.create
);

router.put(
   '/:_id', 
   [checkToken, authorize(cap['update_category'])], 
   categoryController.update
);

router.delete(
   '/:_id', 
   [checkToken, authorize(cap['delete_category'])], 
   categoryController.remove
);