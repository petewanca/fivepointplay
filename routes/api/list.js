module.exports = function(app) {
	const db = require("../../models");
	const passport = require("passport");

	// Testing secure endpoint to api/team
	app.get(
		"/api/list/test",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			res.json({
				success: true,
				msg: "Testing endpoint works correctly."
			});
		}
	);

	// @route GET api/list
	// @desc gets all list items by user id (found in JSON web token)
	app.get(
		"/api/list",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			db.Lists.findAll({
				where: {
					UserId: req.user.dataValues.id
				}
			})
				.then((items) => {
					res.status(200).json(items);
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		}
	);

	// @route POST api/list
	// @desc posts a new list items by user id (found in JSON web token)
	app.post(
		"/api/list",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			db.Lists.create({
				playerName: req.body.playerName,
				commonName: req.body.commonName,
				UserId: req.user.dataValues.id
			})
				.then((data) => {
					res.status(201).json({
						data: data,
						msg: "Player successfully added to list.",
						success: true
					});
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		}
	);

	// @route DELETE api/list/:id
	// @desc deletes a list items by id based user id (found in JSON web token)
	app.delete(
		"/api/list/:id",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			db.Lists.destroy({
				where: {
					id: req.params.id
				}
			})
				.then(() => {
					res.status(200).json({
						msg: "Player successfully deleted from list.",
						success: true
					});
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		}
	);
};
