const router = module.exports = require('express').Router();

const orderDetail = require('@controllers/order-detail');
const checkToken = require('@middlewares/authenticate');
const authorize = require('@middlewares/authorize');

router.get(
   '/:_id',
   [checkToken, authorize(cap['get_order'])],
   orderDetail.getById
);