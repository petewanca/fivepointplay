const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = function(app) {

  // find player by name
  app.get("/api/findPlayer/:playerName", (req, res) => {
    let searchTerm = req.params.playerName;
    db.Players.findAll({
      where: {
        playerName: {
          [Op.like]: `%${searchTerm}%`
        }
      },
      order: [['playerName', 'ASC']]
    }).then(response => {
      let results = [];
      response.forEach(item =>{
        results.push({
          age: item.dataValues.age,
          height: item.dataValues.height,
          weight: item.dataValues.weight,
          teamLogo: item.dataValues.teamLogo,
          id: item.dataValues.id,
          playerName: item.dataValues.playerName,
          playerLink: item.dataValues.playerLink,
          teamName: item.dataValues.teamName,
          position: item.dataValues.position,
          playerImage: item.dataValues.playerImage,
        })
      })
      res.json(results)
    }).catch(err => res.status(404).json(err));
  })

  // show all players
  app.get("/api/allPlayers", (req, res) => {
    db.Players.findAll({
      order: [['playerName', 'ASC']]
    })
    .then(response => {
      let results = [];
      response.forEach(item =>{
        results.push({
          id: item.dataValues.id,
          playerName: item.dataValues.playerName,
          team: item.dataValues.teamName,
          position: item.dataValues.position,
          playerImage: item.dataValues.playerImage,
          playerLink: item.dataValues.playerLink,
          playerImage: item.dataValues.playerImage,
          position: item.dataValues.position,
          age: item.dataValues.age,
          height: item.dataValues.height,
          weight: item.dataValues.weight,
          teamName: item.dataValues.teamName,
          teamLogo: item.dataValues.teamLogo
        })
      })
      res.json(results)
    }).catch(err => res.json(err));
  });

  // get team names and links for UI
  app.get("/api/getTeams", (req, res) => {
    db.Teams.findAll({
      order: [['teamName', 'ASC']]
    }).then(response => {
      let results = [];
      response.forEach(item =>{
        results.push({
          id: item.dataValues.id,
          teamName: item.dataValues.teamName,
          teamLink: item.dataValues.teamLink,
          teamLogo: item.dataValues.teamLogo
        })
      })
      res.json(results)
    }).catch(err => res.status(404).json(err));
  })

  // get roster of team selected by teamName
  app.get("/api/getTeam/:teamName", (req, res) => {
    let team = req.params.teamName;
    
    db.Players.findAll({
      where: {
        teamName: team
      },
      order: [['playerName', 'ASC']]
    }).then(response => {
      roster = [];
      response.forEach(player => {
        roster.push({
          id: player.dataValues.id,
          playerName: player.dataValues.playerName,
          playerImage: player.dataValues.playerImage,
          playerLink: player.dataValues.playerLink,
          position: player.dataValues.position,
          age: player.dataValues.age,
          height: player.dataValues.height,
          weight: player.dataValues.weight,
          teamName: player.dataValues.teamName,
          teamLogo: player.dataValues.teamLogo,
        })
      })
      res.json(roster);
    }).catch(err => res.json(err));
  });

  // get player info by id when clicked from roster
  app.get("/api/player/:id", (req, res) => {
    let playerId = req.params.id;
    db.Players.findAll({
      where: {
        id: playerId
      }
    }).then(response => {
      let player;
      response.forEach(item => {
        player = {
          id: item.dataValues.id,
          playerName: item.dataValues.playerName,
          playerImage: item.dataValues.playerImage,
          playerLink: item.dataValues.playerLink,
          position: item.dataValues.position,
          age: item.dataValues.age,
          height: item.dataValues.height,
          weight: item.dataValues.weight,
          teamName: item.dataValues.teamName,
          teamLogo: item.dataValues.teamLogo,
         };
      });
      res.json(player);
    }).catch(err => res.json(err));
  });

  // get player stats with player and team name
  app.post("/api/stats/", (req, res) => {
    db.Stats.findAll({
        where: {
          playerName: req.body.playerName,
          team: req.body.team
        }
    }).then(response => {
      let player;
      response.forEach(item => {
        player = {
          id: item.dataValues.id,
          playerName: item.dataValues.playerName,
          team: item.dataValues.team,
          position: item.dataValues.position,
          image: item.dataValues.image,
          lsGamesPlayed: item.dataValues.lsGamesPlayed,
          lsMinutesPerGame: item.dataValues.lsMinutesPerGame,
          lsFieldGoalPercentage: item.dataValues.lsFieldGoalPercentage,
          lsThreePointPercentage: item.dataValues.lsThreePointPercentage,
          lsFreeThrowPercentage: item.dataValues.lsFreeThrowPercentage,
          lsRebounds: item.dataValues.lsRebounds,
          lsBlocks: item.dataValues.lsBlocks,
          lsSteals: item.dataValues.lsSteals,
          lsFouls: item.dataValues.lsFouls,
          lsTurnovers: item.dataValues.lsTurnovers,
          lsPointsPerGame: item.dataValues.lsPointsPerGame
         };
      });
      res.json(player);
    }).catch(err => res.json(err));
  });
  
  // fantasy point calculator for single player
  app.post("/api/player/fantasyCalculator/", (req, res) => {
    let typ = req.body.type;
    let type = typ.toLowerCase();
    let playerName = req.body.playerName;
    let team = req.body.team;

    switch(type) {
      case "standard":
        // console.log("standard scoring system")
        db.Stats.findOne({
          where: {
            playerName: playerName,
            team: team
          },
          attributes: [
            'id', 'playerName', 'team', 'position', 'image', 'lsGamesPlayed', 'lsMinutesPerGame',
            'lsFieldGoalPercentage', 'lsThreePointPercentage', 'lsFreeThrowPercentage', 'lsRebounds', 'lsBlocks', 
            'lsSteals', 'lsFouls', 'lsTurnovers', 'lsPointsPerGame', 
            [Sequelize.literal('(lsRebounds + lsBlocks + lsSteals + lsFouls + lsPointsPerGame) - lsTurnovers'), 'fantasyValue']
          ],
          order: [[Sequelize.literal('fantasyValue'), 'DESC']
          ]
        })
        .then(response => {
          let player = {
            fantasyValue: response.dataValues.fantasyValue,
              id: response.dataValues.id,
              playerName: response.dataValues.playerName,
              team: response.dataValues.team,
              position: response.dataValues.position,
              image: response.dataValues.image,
              gamesPlayed: response.dataValues.lsGamesPlayed,
              minutesPerGame: response.dataValues.lsMinutesPerGame,
              fieldGoalPercentage: response.dataValues.lsFieldGoalPercentage,
              threePointPercentage: response.dataValues.lsThreePointPercentage,
              freeThrowPercentage: response.dataValues.lsFreeThrowPercentage,
              rebounds: response.dataValues.lsRebounds,
              blocks: response.dataValues.lsBlocks,
              steals: response.dataValues.lsSteals,
              fouls: response.dataValues.lsFouls,
              turnovers: response.dataValues.lsTurnovers,
              pointsPerGame: response.dataValues.lsPointsPerGame
          };
          res.json(player);
        }).catch(err => res.json(err));
        break;
      case "espn":
        // console.log("espn");
        break;
      case "yahoo":
        // console.log("yahoo");
      break;
      default:
        console.log("no score system selected")
        res.json("whoopsie, choose a scoring system");
    }
  });

  // fantasy point calculator for all players
  app.get("/api/fantasyCalculator/:type", (req, res) => {
    let typ = req.params.type;
    let type = typ.toLowerCase();

    switch(type) {
      case "standard":
        // console.log("standard scoring system")
        db.Stats.findAll({
          attributes: [
            'id', 'playerName', 'team', 'position', 'image', 'lsGamesPlayed', 'lsMinutesPerGame',
            'lsFieldGoalPercentage', 'lsThreePointPercentage', 'lsFreeThrowPercentage', 'lsRebounds', 'lsBlocks', 
            'lsSteals', 'lsFouls', 'lsTurnovers', 'lsPointsPerGame', 
            [Sequelize.literal('(lsRebounds + lsBlocks + lsSteals + lsFouls + lsPointsPerGame) - lsTurnovers'), 'fantasyValue']
          ],
          order: [[Sequelize.literal('fantasyValue'), 'DESC']
          ]
        })
        .then(response => {
          let results = [];
          response.forEach(item =>{
            results.push({
              fantasyValue: item.dataValues.fantasyValue,
              id: item.dataValues.id,
              playerName: item.dataValues.playerName,
              team: item.dataValues.team,
              position: item.dataValues.position,
              image: item.dataValues.image,
              gamesPlayed: item.dataValues.lsGamesPlayed,
              minutesPerGame: item.dataValues.lsMinutesPerGame,
              fieldGoalPercentage: item.dataValues.lsFieldGoalPercentage,
              threePointPercentage: item.dataValues.lsThreePointPercentage,
              freeThrowPercentage: item.dataValues.lsFreeThrowPercentage,
              rebounds: item.dataValues.lsRebounds,
              blocks: item.dataValues.lsBlocks,
              steals: item.dataValues.lsSteals,
              fouls: item.dataValues.lsFouls,
              turnovers: item.dataValues.lsTurnovers,
              pointsPerGame: item.dataValues.lsPointsPerGame
            });
          });
          res.json(results);
        }).catch(err => res.json(err));
        break;
      case "espn":
        // console.log("espn");
        break;
      case "yahoo":
        // console.log("yahoo");
      break;
      default:
        console.log("no score system selected")
        res.json("whoopsie, choose a scoring system");
    }
  });

  // add player to list
  app.post("/api/add-to-list", (req, res) => {
    db.Lists.create({
      playerName: req.body.playerName,
      teamName: req.body.teamName,
      UserId: req.body.userId
    }).then(response => {
      res.json(response);
    }).catch(err => res.json(err));
  });

  // get players from user's list by userId
  app.get("/api/retrieve-favorites/:userId", (req, res) => {
    let userId = req.params.userId;
    
    db.Lists.findAll({
      where: {
        UserId: userId
      }
    })
    .then(response => {
      let results = [];
      response.forEach(item =>{
        results.push({
          playerName: item.dataValues.playerName,
          teamName: item.dataValues.teamName,
        })
      })
      res.json(results)
    })
    .catch(err => res.json(err));

  });

  app.delete("/api/delete-from-list/:userId/:playerName/:teamName", (req, res) => {
    db.Lists.destroy({
      where: {
        playerName: req.params.playerName,
        teamName: req.params.teamName,
        UserId: req.params.userId
      }
    }).then(res => {
      res.json(res)
    }).catch(err => res.json(err));
  });

  // get player profile
  app.post("/api/player-profile/", (req, res) => {
    db.Players.findAll({
      where: {
        playerName: req.body.playerName,
        teamName: req.body.teamName
      }
    }).then(response => {
      let player;
      response.forEach(item =>{
        player = {
          age: item.dataValues.age,
          height: item.dataValues.height,
          weight: item.dataValues.weight,
          teamLogo: item.dataValues.teamLogo,
          id: item.dataValues.id,
          playerName: item.dataValues.playerName,
          playerLink: item.dataValues.playerLink,
          teamName: item.dataValues.teamName,
          position: item.dataValues.position,
          playerImage: item.dataValues.playerImage,
        }
      })
      res.json(player)
    }).catch(err => res.status(404).json(err));
  });

  // =================================================================================
  // =========================== don't even think about it =========================== 
  // =================================================================================  
  // =================================== SCRAPERS ====================================
  // =================================================================================


  // ====================================================
  // get team list ======================================
  // ====================================================
  // app.get("/api/scrape/teams", function(req, res) {
  //     axios.get("https://www.espn.com/nba/teams").then(response => {
  //       const $ = cheerio.load(response.data);
  //       const teamList = [];
  //       // for every div with a class of 'team__list'...
  //       // $("div.layout.is-split").each((i, element) => {
  //       $("section.ContentList__Item").each((i, element) => {
  //         let teamName = $(element).find("h2.clr-gray-01").text();
  //         let teamLink = `https://www.espn.com` + $(element).find("div.TeamLinks__Links span:nth-child(3) a").attr("href");
  //         let teamLogo = $(element).find("section.TeamLinks a figure.Image div.Image__Wrapper img.aspect-ratio--child").attr("src");
        
  //         teamList.push({teamName,teamLink,teamLogo});
  //       });
        
  //       do {
  //         teamList.pop()
  //       }
  //       while (teamList.length > 30);

  //       if (teamList.length === 30) {
  //         res.json(teamList)

  //         teamList.forEach(team => {
  //           db.Teams.create({
  //             teamName: team.teamName,
  //             teamLogo: team.teamLogo,
  //             teamLink: team.teamLink,
  //           })
  //         })
  //       }
  //     }).catch(err => res.status(404).json(err))
  // });

  // ====================================================
  // get team roster ====================================
  // ====================================================
  // app.get("/api/scrape/rosters", function(req, res) {
  //   db.Teams.findAll({})
  //   .then(response => {
  //     const teamsToScrape = [];
  //     response.forEach(team => {
  //       teamsToScrape.push(team.dataValues)
  //     });

  //     if (teamsToScrape.length === 30) {
  //       for (let i = 0; i < teamsToScrape.length; i++) {
  //         axios.get(teamsToScrape[i].teamLink).then(response => {
  //           // console.log(`scraping: ${teamsToScrape[i].teamLink}`);
  //           let teamName = teamsToScrape[i].teamName;
  //           const $ = cheerio.load(response.data);
  //           $("tbody.Table__TBODY tr").each((i, element) => {
  //             let playerName = $(element).find("a").text();
  //             let playerLink = $(element).find("a.AnchorLink").attr("href");
  //             playerLink = playerLink.slice(11);
  //             playerLink = `https://www.${playerLink}`
  //             let playerImage = $(element).find("img.aspect-ratio--child").attr("alt");
  //             let position = $(element).find("td:nth-child(3)").text();
  //             let age = $(element).find("td:nth-child(4)").text();
  //             let height = $(element).find("td:nth-child(5)").text();
  //             let weight = $(element).find("td:nth-child(6)").text();
  //             let logo = $(element).find("img").attr("src");

  //             db.Players.create({
  //               playerName: playerName,
  //               playerLink: playerLink,
  //               playerImage: playerImage,
  //               position: position,
  //               age: age,
  //               height: height,
  //               weight: weight,
  //               teamName: teamName,
  //               teamLogo: logo
  //             }).then(response => {
  //               console.log("adding to DB");
  //             }).catch(err => console.log(err));
  //           });
  //         }).catch(err => console.log(err));
  //       }
  //     }
  //   }).catch(err => console.log(err))
  // });

  // ====================================================
  // save player statistics to DB =======================
  // ====================================================
  // app.get("/api/scrape/stats/", function(req, res) {
  //   db.Players.findAll({})
  //   .then(response => {
  //     const playersToScrape = [];
  //     const numToScrape = response.length;
  //     response.forEach(player => {
  //       // console.log(team.teamLink)
  //       playersToScrape.push(player.dataValues)
  //     });

  //     if (playersToScrape.length === numToScrape) {
  //       for (let i = 0; i < playersToScrape.length; i++) {
  //         let playerName = playersToScrape[i].playerName;
  //         let team = playersToScrape[i].teamName;
  //         let position = playersToScrape[i].position;
  //         let playerImage = playersToScrape[i].playerImage;
  //         let playerLink = playersToScrape[i].playerLink;
  //         axios.get(playerLink).then(response => {
  //         // axios.get("https://espn.com/nba/player/_/id/3056602/semi-ojeleye/").then(response => {
  //             const $ = cheerio.load(response.data);
            
  //             $("section.PlayerStats div.Table__Scroller tr.Table__TR.Table__TR--sm.Table__even[data-idx=0]").each((i, element) => {
  //               db.Stats.create({
  //                 playerName: playerName,
  //                 team: team,
  //                 position: position,
  //                 image: playerImage,
  //                 lsGamesPlayed: $(element).find("td:nth-child(1)").text(),
  //                 lsMinutesPerGame: $(element).find("td:nth-child(2)").text(),
  //                 lsFieldGoalPercentage: $(element).find("td:nth-child(3)").text(),
  //                 lsThreePointPercentage: $(element).find("td:nth-child(4)").text(),
  //                 lsFreeThrowPercentage: $(element).find("td:nth-child(5)").text(),
  //                 lsRebounds: $(element).find("td:nth-child(6)").text(),
  //                 lsAssists: $(element).find("td:nth-child(7)").text(),
  //                 lsBlocks: $(element).find("td:nth-child(8)").text(),
  //                 lsSteals: $(element).find("td:nth-child(9)").text(),
  //                 lsFouls: $(element).find("td:nth-child(10)").text(),
  //                 lsTurnovers: $(element).find("td:nth-child(11)").text(),
  //                 lsPointsPerGame: $(element).find("td:nth-child(12)").text(),
  //               }).then(response => {
  //                 // console.log("scraping")
  //               }).catch(err => console.log(err));
  //             })
              
  //         }).catch(err => console.log(err));
  //       }
  //     }
  //   }).catch(err => console.log(err))
  // });
}