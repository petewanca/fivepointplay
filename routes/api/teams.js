module.exports = function(app) {
	const db = require("../../models");
	const passport = require("passport");

	// @route GET api/teams/
	// @desc secure test of team api
	app.get(
		"/api/teams/test",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			res.json({
				success: true,
				msg: "Testing endpoint works correctly."
			});
		}
	);

	// @route GET api/team/:team
	// @desc get all players from team
	app.get("/api/team/:team", (req, res) => {
		db.Players.findAll({
			where: {
				teamName: req.params.team
			}
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	});
};
