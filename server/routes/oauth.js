const passport = require('passport');
const router   = module.exports = require('express').Router();

router.post('/google', passport.authenticate('google-plus-token', { session: false }), (req, res) => {
   res.send({ status: 200, message: 'Logged in Successfully', data: req.user })
});