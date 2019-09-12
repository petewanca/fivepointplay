// var db = require("../models");

module.exports = function(app) {
  //create new user
  
  app.get("/api/test", function(req, res) {
    res.json({
      message: "test"
    })

    // db.Users.findAll({})
    //   .then(function(result) {
    //     res.json(result);
    //   })
    //   .catch(function(err) {
    //     res.json(err);
    //   });
  });
  
  // app.post("/api/user/add", function(req, res) {
  //   db.Users.create({
  //     email: req.body.email,
  //     userName: req.body.userName,
  //     password: req.body.password,
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName
  //   })
  //     .then(function(result) {
  //       res.json(result);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // //get all users
  // app.get("/api/user/all", function(req, res) {
  //   db.Users.findAll({})
  //     .then(function(result) {
  //       res.json(result);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // //sign-in user
  // app.get("/api/user/:id", function(req, res) {
  //   db.Users.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(result) {
  //       res.json(result);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // // edit user details
  // app.put("/api/user/:id", function(req, res) {
  //   db.Users.update(
  //     {
  //       email: req.body.email,
  //       userName: req.body.userName,
  //       password: req.body.password,
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //     }
  //   )
  //     .then(function(result) {
  //       res.json(result);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });
};