module.exports = function(app) {
    const bcrypt = require('bcryptjs');
    const db = require('../../models');
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const keys = require('../../config/keys');

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
                console.log("error")
                return res.status(404).json({ msgTitle: 'User Not Found', msgBody: 'Please enter a valid email or click "Register" to create a new account.' });
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
                                lastName: user.lastName,
                                email: user.email,
                                avatarUrl: user.imageFile
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
                        .catch((err) => {
                            console.log(err);
                            res.status(200).json(err.response)
                        });
                } else {
                    return res.status(400).json({ msgTitle: 'Incorrect Password', msgBody: 'Please enter the correct password for this account.' });
                }
            });
        });
    });

    app.get('/api/auth/logout', passport.authenticate('jwt', { session: false }), function(req, res){
        req.logout();
        res.json({
            msgTitle: 'Logout Successful', msgBody: 'You have been successfully logged out.',
            success: true
        })
      });
};
