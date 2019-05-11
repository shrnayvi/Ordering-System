const express = require('express');

const router = module.exports = express.Router();

const authorize = require('@middlewares/authorize');
const checkToken = require('@middlewares/authenticate');
const userController = require('@controllers/user');
const { get: getOrder } = require('@controllers/order');

router.get('/', userController.get);
router.get('/:_id', userController.get);

/* Fetch the orders of a particular user */
router.get(
   '/:_id/orders', 
   [checkToken, authorize(cap['get_order'])],
   getOrder
);

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.put('/:_id', checkToken, userController.update);

router.delete(
   '/:_id', 
   [checkToken, authorize(cap['delete_user'])], 
   userController.remove
);