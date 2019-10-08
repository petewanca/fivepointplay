const db = require("../models")
const cheerio = require("cheerio");
const axios = require("axios");

// all 30 teams
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

 // get player list, push to array, save to DB
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
          newPlayerLink
        });

      });

      counter++
      if (counter === teamLinks.length) {
        data.forEach(item => {
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
})