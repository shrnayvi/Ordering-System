const express  = require('express');
const passport = require('passport');

const router   = module.exports = express.Router();

router.get('/google', passport.authenticate('google', {  scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
   res.send({ status: 200, message: 'Logged in successful', data: req.user });
});