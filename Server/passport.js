const JwtStrategy = require('passport-jwt').Strategy,
      LocalStrategy = require('passport-local').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      User = require('./Models/User');
var passport = require('passport');

let opts = {};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = "Petshop";
passport.use(new JwtStrategy(opts, function(payload, done) {
    try {
        // Find the user specified in token
        const user = () => User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async (email, password, done) => {
        try{
            //Find user from email
            const user = await User.findOne({ email });

            //If user doesn't exist, handle it
            if(!user){
                return done(null, false);
            }

            //Check password
            var isValid = await user.isValidPassword(password);

            //Handle
            if(!isValid){
                return done(null, false);
            }

            //Return user
            done(null, user);
        }catch(error){
            done(error, false);
        }
    }));