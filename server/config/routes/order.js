const router = module.exports = require('express').Router();

const orderController = require('@controllers/order');
const orderDetailController = require('@controllers/order-detail');
const checkToken = require('@middlewares/authenticate');
const authorize = require('@middlewares/authorize');

router.get(
   '/:_id/order-details',
   [checkToken, authorize(cap['get_order_detail'])],
   orderDetailController.get
);

router.get(
   '/:_id',
   [checkToken, authorize(cap['get_order'])],
   orderController.getById
);

router.get( '/', 
   [checkToken, authorize(cap['get_order'])],
   orderController.get
)

router.post( '/', 
   [checkToken, authorize(cap['add_order'])],
   orderController.create
);

router.put( '/:_id', 
   [checkToken, authorize(cap['update_order'])],
   orderController.update
);
