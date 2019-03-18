const passport 		= module.exports = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { generateToken }                      = require('@utils/JWT');
const { get: getUser, create: createUser }   = require('@server/services/user')
const { googleClientID, googleClientSecret } = require('@config/keys');

passport.use(
	new GoogleStrategy({
		clientID: googleClientID,
		clientSecret: googleClientSecret,
		callbackURL: '/oauth/google/callback'
	}, async (accessToken, refreshToken, profile, done) => {
      try {
         const { displayName, id, emails }  = profile;
         const user = await getUser({ googleId: id }, true);
         if(user) {
            let token = generateToken({ _id: user._id });
            return done(null, { user, token });
         } 
         try{
            const newUser = await createUser({ googleId: id, name: displayName, email: emails[0].value, socialLogin: true });
            let token = generateToken({ _id: newUser._id });
            done(null, { user: newUser, token });
         } catch(e) {
            console.log(e, 'error creating user');
            done(e);
         }
      } catch(e) {
         console.log(e, 'error fetching user');
         done(e)
      }
	})
);