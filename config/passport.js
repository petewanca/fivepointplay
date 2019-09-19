var bcrypt = require('bcryptjs');

module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(function (id, done) {
        User.findOne({ where: { id: id } }).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });


    // LOCAL SIGN UP
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email', passwordField: 'password', passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        User.findOne({
            where: {
                email: email
            }
        }).then(function (user) {
            if (user) {
                return done(null, false, { message: 'That email is already taken' });

            } else {
                var userPassword = generateHash(password);
                var data = {
                    email: email,
                    password: userPassword,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                };

                User.create(data).then(function (newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }

                });
            }
        });
    }));



    //LOCAL SIGN IN
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
        var User = user;
        var isValidPassword = function (userpass, password) {
            return bcrypt.compareSync(password, userpass);
        }

        User.findOne({
            where: {
                email: email
            }
        }).then(function (user) {
            if (!user) {
                return done(null, false, { message: 'Email does not exist' });
            }

            if (!isValidPassword(user.password, password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            var userinfo = user.get();
            return done(null, userinfo);
        }).catch(function (err) {
            console.log("Error:", err);
            return done(null, false, { message: 'Something went wrong with your sign in' });
        });
    }));
}