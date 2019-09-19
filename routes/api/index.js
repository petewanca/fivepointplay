const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");
const teamLinks = [
  "/teams/ATL/2020.html",
  "/teams/BOS/2020.html",
  "/teams/BRK/2020.html",
  "/teams/CHO/2020.html",
  "/teams/CHI/2020.html",
  "/teams/CLE/2020.html",
  "/teams/DAL/2020.html",
  "/teams/DEN/2020.html",
  "/teams/DET/2020.html",
  "/teams/GSW/2020.html",
  "/teams/HOU/2020.html",
  "/teams/IND/2020.html",
  "/teams/LAC/2020.html",
  "/teams/LAL/2020.html",
  "/teams/MEM/2020.html",
  "/teams/MIA/2020.html",
  "/teams/MIL/2020.html",
  "/teams/MIN/2020.html",
  "/teams/NOP/2020.html",
  "/teams/NYK/2020.html",
  "/teams/OKC/2020.html",
  "/teams/ORL/2020.html",
  "/teams/PHI/2020.html",
  "/teams/PHO/2020.html",
  "/teams/POR/2020.html",
  "/teams/SAC/2020.html",
  "/teams/SAS/2020.html",
  "/teams/TOR/2020.html",
  "/teams/UTA/2020.html",
  "/teams/WAS/2020.html",
];

module.exports = function(app) {

  // save player name, player link, team link to DB
  app.get("/api/scrape/player-list", function(req, res) {
    let counter = 0;    
    const data = [];

    teamLinks.forEach(team => {
      axios.get(process.env.SCRAPE_SITE + team).then(response => {
        const $ = cheerio.load(response.data);
        $("#roster tr td[data-stat='player'] a").each((i, element) => {
          let newPlayerName = $(element).text();
          let newPlayerLink = process.env.SCRAPE_SITE + $(element).attr("href");
          data.push({
            team: process.env.SCRAPE_SITE+team,
            newPlayerName,
            newPlayerLink,
          });
        });

        // $("div.media-item").each((i, element) => {
        //   let teamLogo = $(".teamlogo").attr("src");
        // });

        counter++
        if (counter === teamLinks.length) {
          data.forEach(item => {
            db.Players.create({
              playerName: item.newPlayerName,
              playerLink: item.newPlayerLink,
              teamLink: item.team,
              teamLogo: item.teamLogo
            })
          })
          res.json("success")
        }
      }).catch(err => res.json(err))
    })
  });

  // save team link and logo to DB
  app.get("/api/scrape/team-list", function(req, res) {
    let counter = 0;    
    const data = [];

    teamLinks.forEach(team => {
      axios.get(process.env.SCRAPE_SITE + team).then(response => {
        const $ = cheerio.load(response.data);
        $("div.media-item").each((i, element) => {
          let teamLogo = $(".teamlogo").attr("src");
          data.push({
            teamLink: process.env.SCRAPE_SITE+team,
            teamLogo,
          });
        });


        counter++
        if (counter === teamLinks.length) {
          data.forEach(item => {
            db.Teams.create({
              teamLink: item.teamLink,
              teamLogo: item.teamLogo
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