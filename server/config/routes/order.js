const router = module.exports = require('express').Router();

const orderController = require('@controllers/order');
const checkToken = require('@middlewares/authenticate');
const authorize = require('@middlewares/authorize');

router.get( '/', 
   [checkToken, authorize(cap['get_order'])],
   orderController.get
)

router.get(
   '/:_id',
   [checkToken, authorize(cap['get_order'])],
   orderController.getById
);

router.post( '/', 
   [checkToken, authorize(cap['add_order'])],
   orderController.create
);

router.post( '/bulk', 
   [checkToken, authorize(cap['add_order'])],
   orderController.bulkCreate
);

router.put( '/:_id', 
   [checkToken, authorize(cap['update_order'])],
   orderController.update
);