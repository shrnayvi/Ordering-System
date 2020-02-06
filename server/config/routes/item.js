const router = module.exports = require('express').Router();

const authorize = require('@middlewares/authorize');
const checkToken = require('@middlewares/authenticate');
const itemController = require('@controllers/item');

router.get('/:_id', itemController.getById);
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