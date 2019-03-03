const express = require('express');
const router = module.exports = express.Router();
const userController = require('@server/controllers/user');

router.post('/login', async (req, res) => {
	try {
		const data = { email: req.body.email, password: req.body.password };
		const result = await userController.login(data);
		if(result.canLogin) {
			res.send({ status: 200, message:'Successfully Login', data: result });
		} else {
			res.send({ status: 400, message:'Login Failed', data: result });
		}
	} catch (e) {
		res.send({ status: 500, message: 'Server Error' })
	}
});

router.get('/', async (req, res) => {
	try {
		let users = await userController.get(req.params);
		res.send({ status: 200, message: 'Fetched Users Successfully', data: users });
	} catch (e) {
		res.send({ status: 500, message: 'Server Error', error: e });
	}
});

router.post('/', async (req, res) => {
	try {
		let newUser = await userController.create(req.body);
		res.send({ status: 200, message: 'User Created Successfully', data: newUser });
	} catch (e) {
		if('isJoi' in e && e.isJoi) {
			res.send({ status: 400, message: e.name, error: e.details });
		} else {
			res.send({ status: 500, message: 'Server Error', error: e });
		}
	}
})

router.put('/:_id', async (req, res) => {
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

router.delete('/:_id', async (req, res) => {
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