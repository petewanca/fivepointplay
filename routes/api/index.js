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
          let teamLink = `https://www.espn.com` + $(element).find("div.TeamLinks__Links span:nth-child(3) a").attr("href");
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
    db.Teams.findAll({})
    .then(response => {
      const teamsToScrape = [];
      response.forEach(team => {
        // console.log(team.teamLink)
        teamsToScrape.push(team.dataValues)
      });

      if (teamsToScrape.length === 30) {
        for (let i = 0; i < teamsToScrape.length; i++) {
          console.log(teamsToScrape[i].teamLink)
          axios.get(teamsToScrape[i].teamLink).then(response => {
            const $ = cheerio.load(response.data);
      
            $("tbody.Table__TBODY tr").each((i, element) => {
              let playerName = $(element).find("a").text();
              let playerLink = $(element).find("a.AnchorLink").attr("href");
              // slicedPlayerLink = rawPlayerLink.slice(11);
              // playerLink = `http://${slicedPlayerLink}`;
              let playerImage = $(element).find("img.aspect-ratio--child").attr("alt");
              let position = $(element).find("td:nth-child(3)").text();
              let age = $(element).find("td:nth-child(4)").text();
              let height = $(element).find("td:nth-child(5)").text();
              let weight = $(element).find("td:nth-child(6)").text();
      
              db.Players.create({
                playerName: playerName,
                playerLink: playerLink,
                playerImage: playerImage,
                position: position,
                age: age,
                height: height,
                weight: weight,
                teamName: teamsToScrape[i].teamName,
                teamLink: teamsToScrape[i].teamLink,
                teamLogo: teamsToScrape[i].teamLogo
              }).then(response => {
                console.log("scraping");
              }).catch(err => console.log(err));
      
            })
          }).catch(err => console.log(err));
        }
      }
    }).catch(err => console.log(err))
  });

  // ====================================================
  // save player statistics to DB =======================
  // ====================================================
  app.get("/api/scrape/stats/", function(req, res) {
    db.Players.findAll({})
    .then(response => {
      const playersToScrape = [];
      const numToScrape = response.length;
      response.forEach(player => {
        playersToScrape.push(player.dataValues)
      });
      if (playersToScrape.length === numToScrape) {
        for (let i = 0; i < playersToScrape.length; i++) {
          axios.get(playersToScrape[i].playerLink).then(response => {
              let stats = [];
              const $ = cheerio.load(response.data);
              
              $("section.Card.PlayerStats td.Table__TD").each((i, element) => {
                let data = $(element).text();
                stats.push(data)
              })
              db.Stats.create({
                playerName: playersToScrape[i].playerName,
                team: playersToScrape[i].teamName,
                position: playersToScrape[i].position,
                image: playersToScrape[i].playerImage,
                lsGamesPlayed: stats[3],
                lsMinutesPerGame: stats[4],
                lsFieldGoalPercentage: stats[5],
                lsThreePointPercentage: stats[6],
                lsFreeThrowPercentage: stats[7],
                lsRebounds: stats[8],
                lsAssists: stats[9],
                lsBlocks: stats[10],
                lsSteals: stats[11],
                lsFouls: stats[12],
                lsTurnovers: stats[13],
                lsPointsPerGame: stats[14],
                careerGamesPlayed: stats[15],
                careerMinutesPerGame: stats[16],
                careerFieldGoalPercentage: stats[17],
                careerThreePointPercentage: stats[18],
                careerFreeThrowPercentage: stats[19],
                careerRebounds: stats[20],
                careerAssists: stats[21],
                careerBlocks: stats[22],
                careerSteals: stats[23],
                careerFouls: stats[24],
                careerTurnovers: stats[25],
                careerPointsPerGame: stats[26],
              }).then(response => {
                // console.log("scraping")
              }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }
      }
    }).catch(err => console.log(err))
  });
}