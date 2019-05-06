const router = module.exports = require('express').Router();

const categoryController = require('@server/controllers/category');

router.get('/:slug', categoryController.getBySlug);
router.get('/', categoryController.get);
router.post('/', categoryController.create);
router.put('/:_id', categoryController.update);
router.delete('/:_id', categoryController.remove);