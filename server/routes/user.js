const express = require('express');

const router = module.exports = express.Router();

const checkToken = require('@server/middlewares/auth');
const userController = require('@server/controllers/user');

router.get('/', async (req, res) => {
	try {
		let users = await userController.get(req.params);
		res.send({ status: 200, message: 'Fetched Users Successfully', data: users });
	} catch (e) {
		res.send({ status: 500, message: 'Server Error', error: e });
	}
});

router.post('/login', async (req, res) => {
	try {
		const data = { email: req.body.email, password: req.body.password };
		const result = await userController.login(data);
		res.send({ status: 200, message:'Successfully Login', data: result });
	} catch (e) {
		if(!e.canLogin) {
			res.send({ status: 400, message: e.message });
		} else if(e.isJoi) {
			res.send({ status: 400, message: e.name, error: e.details });
	 	} else {
			res.send({ status: 500, message: 'Server Error' })
		}
	}
});

router.post('/register', async (req, res) => {
	try {
		let newUser = await userController.register(req.body);
		res.send({ status: 200, message: 'User Created Successfully', data: newUser });
	} catch (e) {
		if('isJoi' in e && e.isJoi) {
			res.send({ status: 400, message: e.name, error: e.details });
		} else if('emailExists' in e && e.emailExists) {
			res.send({ status: 400, message: 'Email already registered' });
		} else {
			res.send({ status: 500, message: 'Server Error', error: e });
		}
	}
})

router.put('/:_id', checkToken, async (req, res) => {
	try {
		let users = await userController.update(req.params, req.body);
		if (!users) {
			return res.send({ status: 404, message: 'User Not Found', data: [] });
		}
		res.send({ status: 200, message: 'User Updated Successfully', data: users });
	} catch (e) {
		res.send({ status: 500, message: 'Server Error', error: [] });
	}
})

router.delete('/:_id', checkToken, async (req, res) => {
	try {
		let users = await userController.delete(req.params);
		if (!users) {
			return res.send({ status: 404, message: 'User Not Found', data: [] });
		}
		res.send({ status: 200, message: 'User Updated Successfully', data: users });
	} catch (e) {
		res.send({ status: 500, message: 'Server Error', error: [] });
	}
});