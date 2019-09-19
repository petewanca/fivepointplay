const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");
const teamLinks = [
  "https://www.basketball-reference.com/teams/ATL/2020.html",
  "https://www.basketball-reference.com/teams/BOS/2020.html",
  "https://www.basketball-reference.com/teams/BRK/2020.html",
  "https://www.basketball-reference.com/teams/CHO/2020.html",
  "https://www.basketball-reference.com/teams/CHI/2020.html",
  "https://www.basketball-reference.com/teams/CLE/2020.html",
  "https://www.basketball-reference.com/teams/DAL/2020.html",
  "https://www.basketball-reference.com/teams/DEN/2020.html",
  "https://www.basketball-reference.com/teams/DET/2020.html",
  "https://www.basketball-reference.com/teams/GSW/2020.html",
  "https://www.basketball-reference.com/teams/HOU/2020.html",
  "https://www.basketball-reference.com/teams/IND/2020.html",
  "https://www.basketball-reference.com/teams/LAC/2020.html",
  "https://www.basketball-reference.com/teams/LAL/2020.html",
  "https://www.basketball-reference.com/teams/MEM/2020.html",
  "https://www.basketball-reference.com/teams/MIA/2020.html",
  "https://www.basketball-reference.com/teams/MIL/2020.html",
  "https://www.basketball-reference.com/teams/MIN/2020.html",
  "https://www.basketball-reference.com/teams/NOP/2020.html",
  "https://www.basketball-reference.com/teams/NYK/2020.html",
  "https://www.basketball-reference.com/teams/OKC/2020.html",
  "https://www.basketball-reference.com/teams/ORL/2020.html",
  "https://www.basketball-reference.com/teams/PHI/2020.html",
  "https://www.basketball-reference.com/teams/PHO/2020.html",
  "https://www.basketball-reference.com/teams/POR/2020.html",
  "https://www.basketball-reference.com/teams/SAC/2020.html",
  "https://www.basketball-reference.com/teams/SAS/2020.html",
  "https://www.basketball-reference.com/teams/TOR/2020.html",
  "https://www.basketball-reference.com/teams/UTA/2020.html",
  "https://www.basketball-reference.com/teams/WAS/2020.html",
];

module.exports = function(app) {

  // get player list, push to array, save to DB
  app.get("/api/scrape/player-list", function(req, res) {
    let counter = 0;    
    const data = [];

    teamLinks.forEach(team => {
      axios.get(team).then(response => {
        const $ = cheerio.load(response.data);
        $("#roster tr td[data-stat='player'] a").each((i, element) => {
          let newPlayerName = $(element).text();
          let newPlayerLink = process.env.SCRAPE_SITE + $(element).attr("href");

          data.push({
            team,
            newPlayerName,
            newPlayerLink
          });

        });

        counter++
        if (counter === teamLinks.length) {
          data.forEach(item => {
            // console.log(item.team)
            db.Players.create({
              playerName: item.newPlayerName,
              playerLink: item.newPlayerLink,
              teamLink: item.team
            })
          })
          res.json("success")
        }
      }).catch(err => res.json(err))
    })
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