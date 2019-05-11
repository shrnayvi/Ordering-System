const router = module.exports = require('express').Router();

const authorize            = require('@middlewares/authorize');
const checkToken           = require('@middlewares/authenticate');
const favoriteController   = require('@controllers/favorite');

router.get('/', 
   [ checkToken, authorize(cap['get_favorite'])],
   favoriteController.get
);

router.get(
   '/:user', 
   [checkToken, authorize(cap['get_favorite'])], 
   favoriteController.get
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