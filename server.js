var express = require("express");
var path = require("path");
var PORT = process.env.PORT || 3001;
var app = express();
require("dotenv").config();

var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For passport
app.use(session({ secret: "password", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Setup Misc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Define Models
var db = require("./models");
// Don't drop db by default
var syncOptions = { force: false };

//Load passport strategies
require("./config/passport.js")(passport, db.User);

// Define Routes
require("./routes/api/index")(app);
require("./routes/api/users")(app);
require("./routes/api/auth")(app);
require("./routes/api/teams")(app);
require("./routes/api/list")(app);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync(syncOptions).then(function() {
	app.listen(PORT, function() {
		console.log(`==> 🌎  Listening on port ${PORT}.`);
	});
});

module.exports = app;
