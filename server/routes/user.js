const express = require('express');

const router = module.exports = express.Router();

const authorize = require('@middlewares/authorize');
const checkToken = require('@middlewares/authenticate');
const restrictUser = require('@middlewares/restrict-user');
const userController = require('@controllers/user');
const { get: getOrder } = require('@controllers/order');

router.get( '/verify', userController.emailVerification);
router.get(
   '/', 
   // [checkToken, authorize(cap['get_users'])], 
   userController.get
);

router.get(
   '/:_id', 
   [checkToken, authorize(cap['get_user']), restrictUser], 
   userController.getById
);

/* Fetch the orders of a particular user */
router.get(
   '/:user/orders', 
   [checkToken, authorize(cap['get_order'])],
   getOrder
);

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

router.put(
   '/profile', 
   [checkToken, authorize(cap['edit_user']), restrictUser],
   userController.update
);

router.put(
   '/:_id', 
   [checkToken, authorize(cap['edit_user']), restrictUser],
   userController.update
);

router.delete(
   '/:_id', 
   [checkToken, authorize(cap['delete_user']), restrictUser], 
   userController.remove
);