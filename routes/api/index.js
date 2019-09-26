const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {

  // ====================================================
  // get team list ======================================
  // ====================================================
  app.get("/api/scrape/teams", function(req, res) {
      axios.get("https://www.espn.com/nba/teams").then(response => {
        const $ = cheerio.load(response.data);
        const teamList = [];
        // for every div with a class of 'team__list'...
        // $("div.layout.is-split").each((i, element) => {
        $("section.ContentList__Item").each((i, element) => {
          let teamName = $(element).find("h2.clr-gray-01").text();
          let teamLink = `espn.com` + $(element).find("div.TeamLinks__Links span:nth-child(3) a").attr("href");
          let teamLogo = $(element).find("section.TeamLinks a figure.Image div.Image__Wrapper img.aspect-ratio--child").attr("src");
        
          teamList.push({teamName,teamLink,teamLogo});
        });
        
        do {
          teamList.pop()
        }
        while (teamList.length > 30);

        if (teamList.length === 30) {
          res.json(teamList)

          teamList.forEach(team => {
            db.Teams.create({
              teamName: team.teamName,
              teamLogo: team.teamLogo,
              teamLink: team.teamLink,
            })
          })
        }
      }).catch(err => res.status(404).json(err))
  });

  // ====================================================
  // get team roster ====================================
  // ====================================================
  app.get("/api/scrape/rosters", function(req, res) {
    // const playerResults = [];
    // get team links from DB to scrape

    axios.get("https://www.espn.com/nba/team/roster/_/name/cha/charlotte-hornets").then(response => {
      const $ = cheerio.load(response.data);

      // for every div with a class of 'team__list'...
      $("section.nba-player-index__trending-item").each((i, element) => {
        let playerName = $(element).children("a").attr("title");
        let playerLink = `nba.com` + $(element).children("a").attr("href");
        let playerImage = `https:` + $(element).find("img").attr("data-src");
        let position = $(element).find("div.nba-player-index__details span:nth-child(1)").text();
        let size = $(element).find("div.nba-player-index__details span:nth-child(2)").text();
        let urlArr = playerLink.split("/");
        let statLink = `https://stats.nba.com/player/` + urlArr[urlArr.length - 1];

        playerResults.push(
          playerName, playerLink, playerImage, position, height, weight,
          team.teamName, team.teamLink, team.teamLogo
        );
        // db.Players.create({
        //   playerName: playerName,
        //   playerLink: playerLink,
        //   playerImage: playerImage,
        //   position: position,
        //   size: size,
        //   statLink: statLink,
        //   teamName: team.teamName,
        //   teamLink: team.teamLink,
        //   teamLogo: team.teamLogo
        // })
      });

    });
    
    // db.Teams.findAll({})
    // .then(response => {
    //   const teamsToScrape = [];
    //   response.forEach(team => {
    //     console.log(team.teamLink)
    //     teamsToScrape.push(team.dataValues)

    //   })
      
    //   if (teamsToScrape.length === 30) {
    //     console.log(teamsToScrape)
    //     teamsToScrape.forEach(team => {
    //       axios.get(team.teamLink).then(response => {
            
    //       })
    //     })

    //   }

    // })
    
    // db.Teams.findAll({})
    // .then(response => {
    //   const teamsToScrape = [];
    //   const playerResults = [];
      
    //   console.log(`gathering teams to scrape roster slots...`);
    //   response.forEach(team => {
    //     teamsToScrape.push(team);
    //   });
    //   // once all 30 teams are gathered, run 
    //   // scraper and save each item to DB
    //   if (teamsToScrape.length === 30) {
    //     console.log(`scraping nba teams...`)
    //     teamsToScrape.forEach(team => {
    //       axios.get(team.teamLink).then(response => {
    //         console.log(`scraping ${team.teamName}'s page...`)
    //         const $ = cheerio.load(response.data);
      
    //         // for every div with a class of 'team__list'...
    //         $("section.nba-player-index__trending-item").each((i, element) => {
    //           let playerName = $(element).children("a").attr("title");
    //           let playerLink = `nba.com` + $(element).children("a").attr("href");
    //           let playerImage = `https:` + $(element).find("img").attr("data-src");
    //           let position = $(element).find("div.nba-player-index__details span:nth-child(1)").text();
    //           let size = $(element).find("div.nba-player-index__details span:nth-child(2)").text();
    //           let urlArr = playerLink.split("/");
    //           let statLink = `https://stats.nba.com/player/` + urlArr[urlArr.length - 1];

    //           playerResults.push(
    //             playerName, playerLink, playerImage, position, height, weight,
    //             team.teamName, team.teamLink, team.teamLogo
    //           );
    //           // db.Players.create({
    //           //   playerName: playerName,
    //           //   playerLink: playerLink,
    //           //   playerImage: playerImage,
    //           //   position: position,
    //           //   size: size,
    //           //   statLink: statLink,
    //           //   teamName: team.teamName,
    //           //   teamLink: team.teamLink,
    //           //   teamLogo: team.teamLogo
    //           // })
    //         });
    //       // end of axios call
    //       }).catch(err => res.status(404).json(err));
    //     });
    //     console.log(playerResults);
    //   }
    // });
  });

  // =============================================
  // save player statistics to DB
  // =============================================
  app.get("/api/scrape/stats/", function(req, res) {
    // const playersToScrape = [];
    // const playerResults = [];
    // // get team links from DB to scrape
    // db.Players.findAll({})
    // .then(response => {
    //   console.log(`gathering players to scrape stats...`);
    //   response.forEach(player => {
    //     playersToScrape.push(player.dataValues);
    //   });
      // once all players are gathered, run 
      // scraper and save each item to DB
      // if (playersToScrape.length === response.length) {
      //   console.log(`scraping player stats...`)
      //   playersToScrape.forEach(player => {
          // axios.get(player.statLink).then(response => {
          axios.get("https://www.espn.com/nba/player/_/id/4395625/rj-barrett").then(response => {
            const player = [];
            // console.log(`scraping ${player.playerName}'s page...`)
            // console.log(player.statLink)
            const $ = cheerio.load(response.data);
            // specs
            $("body").each((i, element) => {
              let firstName = $(element).find("h1.PlayerHeader__Name span:nth-child(1)").text();
              let lastName = $(element).find("h1.PlayerHeader__Name span:nth-child(2)").text();
              let team = $(element).find("ul.PlayerHeader__Team_Info li:nth-child(1)").text();;
              let position = $(element).find("ul.PlayerHeader__Team_Info li:nth-child(2)").text();
              let image = $(element).find("div.Image__Wrapper.aspect-ratio--auto img").attr("src");
              // let playerName = firstName + " " + lastName
              // console.log(`table data: ${test}`);
              player.push(firstName, lastName, team, position, image);
            });
            // stats
            $("section.Card.PlayerStats td.Table__TD").each((i, element) => {
              let data = $(element).text();
              player.push(data)
            })
            res.json(player)
            db.Stats.create({
              firstName: player[0],
              lastName: player[1],
              team: player[2],
              position: player[3],
              image: player[4],
              lsGamesPlayed: player[7],
              lsMinutesPerGame: player[8],
              lsFieldGoalPercentage: player[9],
              lsThreePointPercentage: player[10],
              lsFreeThrowPercentage: player[11],
              lsRebounds: player[12],
              lsAssists: player[13],
              lsBlocks: player[14],
              lsSteals: player[15],
              lsFouls: player[13],
              lsTurnovers: player[16],
              lsPointsPerGame: player[17],
              careerGamesPlayed: player[18],
              careerMinutesPerGame: player[19],
              careerFieldGoalPercentage: player[20],
              careerThreePointPercentage: player[21],
              careerFreeThrowPercentage: player[22],
              careerRebounds: player[23],
              careerAssists: player[24],
              careerBlocks: player[25],
              careerSteals: player[26],
              careerFouls: player[27],
              careerTurnovers: player[28],
              careerPointsPerGame: player[29],
            })
        });
  //     }
  });
}