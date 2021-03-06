const passport = module.exports = require('passport');
const GoogleStrategy = require('passport-google-plus-token');

const User = require('@models/user')
const { generateToken } = require('@utils/JWT');
const { jwtExpiration } = require('@config/constants');

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { displayName, id, emails } = profile;
      const user = await User.findOne({ googleId: id });
      if (user) {
        const { _id, role } = user;
        const token = generateToken(jwtExpiration, { _id, role });
        return done(null, { user: { _id, role }, token });
      }
      try {
        const doc = new User({
          googleId: id,
          name: displayName,
          email: emails[0].value,
          method: 'google',
          role: 'customer',
          status: 1
        });
        const newUser = doc.save();
        const { _id, role } = newUser;
        const token = generateToken(jwtExpiration, { _id, role });
        done(null, { user: { _id, role }, token });
      } catch (e) {
        // done(null, { error: e.message });
        next(e);
      }
    } catch (e) {
      console.log(e.message, 'Error fetching socially loggedin user')
      // done(null, { error: 'error_fetching_user' });
      // done(e)

      next(e);
    }
  })
);