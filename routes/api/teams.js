module.exports = function(app) {
    const db = require("../../models");
    const jwt = require('jsonwebtoken');
    const passport = require("passport");

    // @route GET api/teams/
	// @desc secure test of team api
	app.get("/api/teams/test", passport.authenticate("jwt", { session: false }), (req, res) => {
		res.json({
			success: true,
			msg: "Testing endpoint works correctly.",
		});
    });

    app.get("/api/teams", passport.authenticate("jwt", { session: false }), (req, res) => {
        db.Teams.findAll({})
        .then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    });
    

};
