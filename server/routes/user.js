const express = require('express');

const router = module.exports = express.Router();

const checkToken = require('@server/middlewares/auth');
const userController = require('@server/controllers/user');

router.get('/', userController.get);
router.get('/:_id', userController.get);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/:_id', checkToken, userController.update);
router.delete('/:_id', checkToken, userController.delete);