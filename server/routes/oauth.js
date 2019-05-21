const passport = require('passport');
const router   = module.exports = require('express').Router();

router.post('/google', passport.authenticate('google-plus-token', { session: false }), (req, res) => {
   const data = req.user;
   if('error' in data) {
      return apiResponse.badRequest(res, { message: data.error });
   }
   return apiResponse.success(res, { message: 'Logged in Successfully', data: req.user });
});