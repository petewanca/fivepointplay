const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../models');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {

    passport.serializeUser(function(user, done) {
        done(null, user);
       });
    passport.deserializeUser(function(user, done) {
        done(null, user);
       });

    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
            db.Users
                .findOne({
                    where: {
                        id: jwtPayload.id
                    }
                })
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => console.log(err));
        })
    );

    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "http://localhost:3001/api/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            db.Users.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
};
