module.exports = function(app) {
    const bcrypt = require('bcryptjs');
    const db = require('../../models');
    const passport = require('passport');

    app.get('/api/users/test', (req, res) => {
        res.json({
            success: true,
            msg: 'Testing endpoint works correctly.'
        });
    });

    // @route POST api/users/
    // @desc creates a new user
    app.post('/api/users', (req, res) => {
        db.Users
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if (user) {
                    return res.status(400).json({
                        email: 'This email already exists.'
                    });
                } else {
                    const newUser = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password
                    };

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            db.Users
                                .create(newUser)
                                .then((user) => {
                                    res.status(200).json({
                                        message: 'User account successfully created.',
                                        userCreated: true
                                    });
                                })
                                .catch((err) => console.log(err));
                        });
                    });
                };
            });
    });
}