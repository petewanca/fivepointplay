module.exports = function(app) {
    const db = require("../../models");
    const jwt = require('jsonwebtoken');
    const passport = require("passport");

    // Testing secure endpoint to api/team
	app.get("/api/list/test", passport.authenticate("jwt", { session: false }), (req, res) => {
		res.json({
			success: true,
			msg: "Testing endpoint works correctly.",
		});
    });
    
    app.post("/api/list", passport.authenticate("jwt", { session: false }), (req, res) => {
        db.Lists.create({
            playerName: req.body.playerName,
            commonName: req.body.commonName,
            UserId: req.user.dataValues.id
        }
        ).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        })
    })

};
