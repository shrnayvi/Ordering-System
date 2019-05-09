const router = module.exports = require('express').Router();

const authorize            = require('@server/middlewares/authorize');
const checkToken           = require('@server/middlewares/authenticate');
const favoriteController   = require('@server/controllers/favorite');

router.get('/', 
   [ checkToken, authorize(cap['get_favorite'])],
   favoriteController.get
);

router.get(
   '/:user', 
   [checkToken, authorize(cap['get_favorite'])], 
   favoriteController.getByUser
);

router.post('/', 
   [checkToken, authorize(cap['add_favorite'])], 
   favoriteController.create
);

router.delete(
   '/:_id', 
   [checkToken, authorize(cap['remove_favorite'])], 
   favoriteController.remove
);