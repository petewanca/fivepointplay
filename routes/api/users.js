module.exports = function(app) {
	const bcrypt = require("bcryptjs");
    const db = require("../../models");
    const jwt = require('jsonwebtoken');
    const passport = require("passport");
    const keys = require('../../config/keys');

	app.get("/api/users/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
		db.Users.findOne({
			where: {
				id: req.params.id
			}
		}).then(user =>{
			res.status(200).json(user);
		}).catch(err => {
			res.status(500).json(err)
		})

	});

	// @route POST api/users/
	// @desc creates a new user
	app.post("/api/users", (req, res) => {
		db.Users.findOne({
			where: {
				email: req.body.email,
			},
		}).then(user => {
			if (user) {
				return res.status(400).json({
					email: "This email already exists.",
				});
			} else {
				const newUser = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					password: req.body.password,
				};

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;

						db.Users.create(newUser)
							.then(user => {
								res.status(200).json({
									message:
										"User account successfully created.",
									userCreated: true,
								});
							})
							.catch(err => console.log(err));
					});
				});
			}
		});
	});

	// @route DELETE api/users/
	// @desc deletes a user
	app.delete(
		"/api/users/:id",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			db.Users.destroy({
				where: {
					id: req.params.id,
				},
			})
				.then(() => {
					res.status(200).json({
						message: "User account successfully deleted.",
						userDeleted: true,
					});
				})
				.catch(err => {
					res.status(500).json(err);
				});
		}
	);

	// @route PUT api/users/:id
	// @desc updates a user
	app.put(
		"/api/users/:id",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			db.Users.update(
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			).then(() => {
				db.Users.findByPk(req.params.id)
					.then(data => {
						res.status(200).json({
							firstName: data.firstName,
							lastName: data.lastName,
							email: data.email,
							message: "User account successfully updated.",
							userUpdated: true,
						});
					})
					.catch(err => {
						res.status(500).json(err);
					});
			});
		}
	);

	// @route PUT api/users/:id
	// @desc updates a user password
	app.put(
		"/api/users/password/:id",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			console.log(req.body);
            const { passwordNew, passwordVerify } = req.body;

            if (passwordNew === passwordVerify) {
                bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(passwordNew, salt, (err, hash) => {
                        
                        if (err) throw err;
						passwordUpdate = hash;

						db.Users.update(
                            {
                                password: passwordUpdate
                            },
                            {
                                where: {
                                    id: req.params.id,
                                },
                            })
							.then(() => {
                                db.Users.findByPk(req.params.id)
                                    .then(data => {
                                        const payload = {
                                            id: data.id,
                                            firstName: data.firstName,
                                            lastName: data.lastName
                                        };

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
                                    .catch(err => {
                                        res.status(500).json(err);
                                    });
                                });
					});
				});
            } else {
                return res
                    .status(400)
                    .json({ msg: "Passwords do not match." });
            }
		}
	);
};
