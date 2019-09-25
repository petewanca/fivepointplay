const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {

  // ====================================================
  // get team list ======================================
  // ====================================================
  app.get("/api/scrape/teams", function(req, res) {
    const results = [];
      axios.get("https://www.nba.com/teams/").then(response => {
        const $ = cheerio.load(response.data);
        // for every div with a class of 'team__list'...
        $("div.team__list").each((i, element) => {
          let teamName = $(element).text();
          let teamLogo = $(element).children("img").attr("src");
          let teamLink = `https://www.nba.com` + $(element).children("a").attr("href");
          // create obj with results to push to array
          results.push({
            teamName: teamName,
            teamLogo: teamLogo,
            teamLink: teamLink
          });
        });
        // ensure results obj has all 30 teams added...
        if (results.length === 30) {
          results.forEach(team => {
            db.Teams.create({
              teamName: team.teamName,
              teamLogo: team.teamLogo,
              teamLink: team.teamLink,
            })
          })
          res.status(200).json(results)
        }
      }).catch(err => res.status(404).json(err))
  });


  // ====================================================
  // get team roster ====================================
  // ====================================================
  app.get("/api/scrape/rosters", function(req, res) {
    const teamsToScrape = [];
    const playerResults = [];
    // get team links from DB to scrape
    db.Teams.findAll({})
    .then(response => {
      console.log(`gathering teams to scrape roster slots...`);
      response.forEach(team => {
        teamsToScrape.push(team);
      });
      // once all 30 teams are gathered, run 
      // scraper and save each item to DB
      if (teamsToScrape.length === 30) {
        console.log(`scraping nba teams...`)
        teamsToScrape.forEach(team => {
          axios.get(team.teamLink).then(response => {
            console.log(`scraping ${team.teamName}'s page...`)
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

              db.Players.create({
                playerName: playerName,
                playerLink: playerLink,
                playerImage: playerImage,
                position: position,
                size: size,
                statLink: statLink,
                teamName: team.teamName,
                teamLink: team.teamLink,
                teamLogo: team.teamLogo
              })
            });

          // end of axios call
          }).catch(err => res.status(404).json(err));
        });
      }
    });
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
          axios.get("https://www.espn.com/nba/player/_/id/4065697/dennis-smith-jr").then(response => {
            const player = [];
            // console.log(`scraping ${player.playerName}'s page...`)
            // console.log(player.statLink)
            const $ = cheerio.load(response.data);
            // res.json(response.data);
            // for every div with a class of 'team__list'...
            $("body").each((i, element) => {
                                                  // $('input[name="data[text_amount]"]'));
              // let data = $(element).find("section.PlayerStats tbody td").text();
              let firstName = $(element).find("h1.PlayerHeader__Name span:nth-child(1)").text();
              let lastName = $(element).find("h1.PlayerHeader__Name span:nth-child(2)").text();
              let team = $(element).find("ul.PlayerHeader__Team_Info li:nth-child(1)").text();;
              let position = $(element).find("ul.PlayerHeader__Team_Info li:nth-child(2)").text();
              let image = $(element).find("div.Image__Wrapper.aspect-ratio--auto img").attr("src");
              // let playerName = firstName + " " + lastName
              // console.log(`table data: ${test}`);
              player.push(firstName, lastName, team, position, image);
            });
            $("section.Card.PlayerStats td.Table__TD").each((i, element) => {
              let data = $(element).text();

              player.push(data)
              // let playerName = $(element).children("a").attr("title");
              // let playerLink = `nba.com` + $(element).children("a").attr("href");
              // let playerImage = `https:` + $(element).find("img").attr("data-src");
              // let position = $(element).find("div.nba-player-index__details span:nth-child(1)").text();
              // let size = $(element).find("div.nba-player-index__details span:nth-child(2)").text();
              // let urlArr = playerLink.split("/");
              // let statLink = `https://stats.nba.com/player/` + urlArr[urlArr.length - 1];
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