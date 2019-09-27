const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = function(app) {

  // find player by name
  app.get("/api/findPlayer/:playerName", (req, res) => {
    let searchTerm = req.params.playerName;
    db.Stats.findAll({
      where: {
        playerName: {
          [Op.like]: `%${searchTerm}%`
        }
      }
    }).then(response => {
      let results = [];
      response.forEach(item =>{
        results.push({
          id: item.dataValues.id,
          playerName: item.dataValues.playerName,
          team: item.dataValues.team,
          position: item.dataValues.position,
          image: item.dataValues.image,
          gamesPlayed: item.dataValues.lsGamesPlayed,
          minutesPerGame: item.dataValues.lsMinutesPerGame,
          fieldGoalPercentage: item.dataValues.fieldGoalPercentage,
          threePointPercentage: item.dataValues.lsThreePointPercentage,
          freeThrowPercentage: item.dataValues.lsFreeThrowPercentage,
          rebounds: item.dataValues.lsRebounds,
          blocks: item.dataValues.lsBlocks,
          steals: item.dataValues.lsSteals,
          fouls: item.dataValues.lsFouls,
          turnovers: item.dataValues.lsTurnovers,
          pointsPerGame: item.dataValues.lsPointsPerGame
        })
      })
      res.json(results)
    }).catch(err => res.status(404).json(err));
  })

  // show all players
  app.get("api/allPlayers", (req, res) => {

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

  // fantasy point calculator
  app.get("/api/fantasyCalculator/:type", (req, res) => {
    let typ = req.params.type;
    let type = typ.toLowerCase();

    switch(type) {
      case "standard":
        console.log("standard scoring system")
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
        console.log("espn");
        break;
      case "yahoo":
        console.log("yahoo");
      break;
      default:
        console.log("no score system selected")
        res.json("whoopsie, choose a scoring system");
    }
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