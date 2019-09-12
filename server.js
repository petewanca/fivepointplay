var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

require("dotenv").config();

// Setup Misc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define Models
var db = require("./models");
// Don't drop db by default
var syncOptions = { force: false };

// Define Routes
require("./routes/api/index")(app);

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`==> 🌎  Listening on port ${PORT}.`,
    );
  });
});

module.exports = app;