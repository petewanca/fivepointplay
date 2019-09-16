var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

var passport = require("passport");
var session = require("express-session");
var bodyParser = require('body-parser');

require("dotenv").config();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For passport
app.use(session({ secret: 'password', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Setup Misc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define Models
var db = require("./models");
// Don't drop db by default
var syncOptions = { force: false };

//Load passport strategies
require('./app/config/passport.js')(passport, db.user-model);

// Define Routes
require("./routes/api/index")(app);

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`==> 🌎  Listening on port ${PORT}.`,
    );
  });
});

module.exports = app;