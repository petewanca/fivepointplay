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

  // =============================================
  // save player name, player link, team link to DB
  // =============================================
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
          res.status(200).json("success")
        }
      }).catch(err => res.status(404).json(err))
    })
  });

  
  // =============================================
  // save team link and logo to DB
  // =============================================
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
          res.status(200).json("success")
        }
      }).catch(err => res.status(404).json(err))
    })
  });


  // =============================================
  // save player statistics to DB
  // =============================================
  app.get("/api/scrape/player-stats/", function(req, res) {
    let counter = 0;    
    let numMatch;
    let playersToScrape = [];

    // prepare player links to scrape
    db.Players.findAll({})
    .then(response => {
      console.log(`gathering results from DB...`)
      numMatch = response.length;

      response.forEach(item => {
        counter++
        playersToScrape.push(item.dataValues.playerLink)
      })

      // use counter to match DB return count, force wait before next call
      if (counter === numMatch) {
        console.log(`waiting for sync...`)
        let dataSet = [];
        let playername;
        let playerImage;
        // need to insert previous season's stats in array and also model (hit last index in array)
        let careerMinutes = [];
        let careerFg = [];
        let careerFga = [];
        let careerFgp = [];
        let careerThreesMade = [];
        let careerThreesAttempted = [];
        let careerThreePct = [];
        let careerTwosMade = [];
        let careerTwosAttempted = [];
        let careerTwosPct = [];
        let careerEfgp = [];
        let careerFt = [];
        let careerFta = [];
        let careerFtp = [];
        let careerOrb = [];
        let careerDrb = [];
        let careerTrb = [];
        let careerAst = [];
        let careerStl = [];
        let careerBlk = [];
        let careerTov = [];
        let careerPf = [];
        let careerPpg = [];

        // scrape prepped player links
        playersToScrape.forEach(link => {
          axios.get(link).then(response => {
            const $ = cheerio.load(response.data);
    
            // get player name
            $("#meta div h1").each(function(i, element) {
              let data = $(element).text()
              playerName = data;
            });

            // get player image  
            $("#info #meta div.media-item img").each(function(i, element) {
              let data = $(element).attr("src")
              playerImage = data;
            });
            
            // get career minutes averaged  
            $("#div_per_game table tfoot tr td[data-stat='mp_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerMinutes.push(data);
            });
    
            // get career field goals made avg
            $("#div_per_game table tfoot tr td[data-stat='fg_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerFg.push(data);
            });
    
            // get career field goals attempted avg
            $("#div_per_game table tfoot tr td[data-stat='fga_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerFga.push(data);
            });
    
            // get career field goal pct
            $("#div_per_game table tfoot tr td[data-stat='fg_pct']").each(function(i, element) {
              let data = $(element).text()
              careerFgp.push(data);
            });
    
            // get career three points made avg
            $("#div_per_game table tfoot tr td[data-stat='fg3_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerThreesMade.push(data);
            });
    
            // get career three point attempts avg
            $("#div_per_game table tfoot tr td[data-stat='fg3a_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerThreesAttempted.push(data);
            });
    
            // get career three point pct
            $("#div_per_game table tfoot tr td[data-stat='fg3_pct']").each(function(i, element) {
              let data = $(element).text()
              careerThreePct.push(data);
            });
    
            // get career two points made avg
            $("#div_per_game table tfoot tr td[data-stat='fg2_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerTwosMade.push(data);
            });
    
            // get career two point attempts avg
            $("#div_per_game table tfoot tr td[data-stat='fg2a_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerTwosAttempted.push(data);
            });
    
            // get career two point pct
            $("#div_per_game table tfoot tr td[data-stat='fg2_pct']").each(function(i, element) {
              let data = $(element).text()
              careerTwosPct.push(data);
            });
    
            // get career field goal efc pct
            $("#div_per_game table tfoot tr td[data-stat='efg_pct']").each(function(i, element) {
              let data = $(element).text()
              careerEfgp.push(data);
            });
    
            // get career free throws made avg
            $("#div_per_game table tfoot tr td[data-stat='ft_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerFt.push(data);
            });
    
            // get career free throw attempt avg
            $("#div_per_game table tfoot tr td[data-stat='fta_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerFta.push(data);
            });
    
            // get career free throw pct
            $("#div_per_game table tfoot tr td[data-stat='ft_pct']").each(function(i, element) {
              let data = $(element).text()
              careerFtp.push(data);
            });
    
            // get career offensive reb avg
            $("#div_per_game table tfoot tr td[data-stat='orb_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerOrb.push(data);
            });
    
            // get career defensive reb avg
            $("#div_per_game table tfoot tr td[data-stat='drb_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerDrb.push(data);
            });
    
            // get career total reb avg
            $("#div_per_game table tfoot tr td[data-stat='trb_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerTrb.push(data);
            });
    
            // get career total assists avg
            $("#div_per_game table tfoot tr td[data-stat='ast_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerAst.push(data);
            });
    
            // get career total steals avg
            $("#div_per_game table tfoot tr td[data-stat='stl_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerStl.push(data);
            });
    
            // get career total blocks avg
            $("#div_per_game table tfoot tr td[data-stat='blk_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerBlk.push(data);
            });
    
            // get career turnover avg
            $("#div_per_game table tfoot tr td[data-stat='tov_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerTov.push(data);
            });
    
            // get career fouls avg
            $("#div_per_game table tfoot tr td[data-stat='pf_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerPf.push(data);
            });
    
            // get career ppg avg 
            $("#div_per_game table tfoot tr td[data-stat='pts_per_g']").each(function(i, element) {
              let data = $(element).text()
              careerPpg.push(data);
            });
    
    
            // player statistics results object
            dataSet.push({
              playerName,
              playerImage,
              careerMinutes: careerMinutes[0],
              careerFg: careerFg[0],
              careerFga: careerFga[0],
              careerFgp: careerFgp[0],
              careerThreesMade: careerThreesMade[0],
              careerThreesAttempted: careerThreesAttempted[0],
              careerThreePct: careerThreePct[0],
              careerTwosMade: careerTwosMade[0],
              careerTwosAttempted: careerTwosAttempted[0],
              careerTwosPct: careerTwosPct[0],
              careerEfgp: careerEfgp[0],
              careerFt: careerFt[0],
              careerFta: careerFta[0],
              careerFtp: careerFtp[0],
              careerOrb: careerOrb[0],
              careerDrb: careerDrb[0],
              careerTrb: careerTrb[0],
              careerAst: careerAst[0],
              careerStl: careerStl[0],
              careerBlk: careerBlk[0],
              careerTov: careerTov[0],
              careerPf: careerPf[0],
              careerPpg: careerPpg[0]
            });

            // end of push before axios goes to next player page
            console.log(`length checker: ${dataSet.length}`)
            console.log(playerImage)
            console.log(playerName)
            // makes sure dataSet array matches response from DB to scrape all player data
            if (dataSet.length === numMatch) {
              console.log("your dataSet matches the length of your playersToScrape array");
              res.json(dataSet)
            }

          })
        // counter++
        // if (counter === playersToScrape.length) {
        // }
        })

      }
    }).catch(err => res.status(404).json(err))



    // res.json(dataSet);

  });

};


/*
db.Players.update({
  user: data.username,
  chatroomID: data.chatroomID
}, {
  where: { socketID: socket.id },
  returning: true,
  plain: true
})
.then(function (result) {
  console.log(result);   
  // result = [x] or [x, y]
  // [x] if you're not using Postgres
  // [x, y] if you are using Postgres
});
*/