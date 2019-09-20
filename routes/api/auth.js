module.exports = function(app) {
    const bcrypt = require('bcryptjs');
    const db = require('../../models');
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const keys = require('../../config/keys');

    // Redirect to Google authentication.
    app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', "email"] }));

    // After authentication, redirect back to home page.
    app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/404', session: false }), function(req, res) {
        var token = req.user.token
        res.redirect('/');
        res.redirect("http://localhost:3000?token=" + token);
    });

    // @route GET api/auth/test
    // @desc tests the users api route
    app.get('/api/auth/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route GET api/auth/test
    // @desc tests secure api route
    app.get('/api/auth/test-secure', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({
            success: true,
            msg: 'Secure test is working correctly.'
        });
    });

    // @route POST api/auth/login
    // @desc logs in a user
    app.post('/api/auth/login', (req, res) => {
        const { email, password } = req.body;

        // Find user by email
        db.Users.findOne({ where: { email } }).then((user) => {
            // Check the user exists
            if (!user) {
                return res.status(404).json({ msg: 'User not found.' });
            }

            let currentUser = user.get();

            // Check the password
            bcrypt.compare(password, currentUser.password).then((isMatch) => {
                if (isMatch) {
                    db.Users
                        .findOne({ where: { id: user.id }})
                        .then((user) => {
                            // create the payload
                            const payload = {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName
                            };

                            // sign the token
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 3600 * 12 },
                                (err, token) => {
                                    res.json({
                                        ...payload,
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            );
                        })
                        .catch((err) => console.log(err));
                } else {
                    return res.status(400).json({ msg: 'User password could not be validated.' });
                }
            });
        });
    });
};
