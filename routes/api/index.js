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
    // setting counters at different numbers because
    // they're used to kick off second portin of logic
    let counter = 0;
    let dbSearchTotal = 1;  
    let playersToScrape = [];

    // prepare player links to scrape
    db.Players.findAll({})
    .then(response => {
      console.log(`gathering results from DB...`)
      // setting num of rows db returns to count against
      dbSearchTotal = response.length;
      // setting links that scraper will use for stats
      response.forEach(item => {
        counter++
        playersToScrape.push(item.dataValues.playerLink)
      })

      // once counter and dbSearchTotal match, scrape
      // can begin before pushing to db table
      if (counter === dbSearchTotal) {
        console.log(`beginning scrape...`)
        // setting variables to push scrape data to
        // and object to contain all results to send to db
        let dataSet = [];
        let playerName = "";
        let playerImage = "";
        let season = [];
        let age = [];
        let team = [];
        let position = [];
        let gamesPlayed = [];
        let gamesStarted = [];
        let minutesPlayed = [];
        let fg = [];
        let fga = [];
        let fgp = [];
        let threesMade = [];
        let threesAttempted = [];
        let threePct = [];
        let twosMade = [];
        let twosAttempted = [];
        let twosPct = [];
        let efgp = [];
        let ft = [];
        let fta = [];
        let ftp = [];
        let orb = [];
        let drb = [];
        let trb = [];
        let ast = [];
        let stl = [];
        let blk = [];
        let tov = [];
        let pf = [];
        let ppg = [];
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

            // gets seasons
            $("#div_per_game table tbody th[data-stat='season']").each(function(i, element) {
              let data = $(element).text()
              season.push(data);
            });

            // get ages
            $("#div_per_game table tbody td[data-stat='age']").each(function(i, element) {
              let data = $(element).text()
              age.push(data);
            });

            // get teams
            $("#div_per_game table tbody td[data-stat='team_id']").each(function(i, element) {
              let data = $(element).text()
              team.push(data);
            });

            // get position
            $("#div_per_game table tbody td[data-stat='pos']").each(function(i, element) {
              let data = $(element).text()
              position.push(data);
            });

            // get games played
            $("#div_per_game table tbody td[data-stat='g']").each(function(i, element) {
              let data = $(element).text()
              gamesPlayed.push(data);
            });

            // get games started
            $("#div_per_game table tbody td[data-stat='gs']").each(function(i, element) {
              let data = $(element).text()
              gamesStarted.push(data);
            });

            // get minutes played
            $("#div_per_game table tbody td[data-stat='mp_per_g']").each(function(i, element) {
              let data = $(element).text()
              minutesPlayed.push(data);
            });

            // get field goals per game
            $("#div_per_game table tbody td[data-stat='fg_per_g']").each(function(i, element) {
              let data = $(element).text()
              fg.push(data);
            });

            // get field goal attempts per game
            $("#div_per_game table tbody td[data-stat='fga_per_g']").each(function(i, element) {
              let data = $(element).text()
              fga.push(data);
            });

            // get field goal percentage
            $("#div_per_game table tbody td[data-stat='fg_pct']").each(function(i, element) {
              let data = $(element).text()
              fgp.push(data);
            });

            // get threes made per game
            $("#div_per_game table tbody td[data-stat='fg3_per_g']").each(function(i, element) {
              let data = $(element).text()
              threesMade.push(data);
            });

            // get threes attempted per game
            $("#div_per_game table tbody td[data-stat='fg3a_per_g']").each(function(i, element) {
              let data = $(element).text()
              threesAttempted.push(data);
            });

            // get three point percentage
            $("#div_per_game table tbody td[data-stat='fg3_pct']").each(function(i, element) {
              let data = $(element).text()
              threePct.push(data);
            });

            // get twos made per game
            $("#div_per_game table tbody td[data-stat='fg2_per_g']").each(function(i, element) {
              let data = $(element).text()
              twosMade.push(data);
            });

            // get twos attempted per game
            $("#div_per_game table tbody td[data-stat='fg2a_per_g']").each(function(i, element) {
              let data = $(element).text()
              twosAttempted.push(data);
            });

            // get two point percentage
            $("#div_per_game table tbody td[data-stat='fg2_pct']").each(function(i, element) {
              let data = $(element).text()
              twosPct.push(data);
            });

            // get effective fg percentage
            $("#div_per_game table tbody td[data-stat='efg_pct']").each(function(i, element) {
              let data = $(element).text()
              efgp.push(data);
            });

            // get free throws per game
            $("#div_per_game table tbody td[data-stat='ft_per_g']").each(function(i, element) {
              let data = $(element).text()
              ft.push(data);
            });

            // get free throws attempted per game
            $("#div_per_game table tbody td[data-stat='fta_per_g']").each(function(i, element) {
              let data = $(element).text()
              fta.push(data);
            });

            // get free throw percentage
            $("#div_per_game table tbody td[data-stat='ft_pct']").each(function(i, element) {
              let data = $(element).text()
              ftp.push(data);
            });

            // get offensive rebounds per game
            $("#div_per_game table tbody td[data-stat='orb_per_g']").each(function(i, element) {
              let data = $(element).text()
              orb.push(data);
            });

            // get defensive rebounds per game
            $("#div_per_game table tbody td[data-stat='drb_per_g']").each(function(i, element) {
              let data = $(element).text()
              drb.push(data);
            });

            // get total rebounds per game
            $("#div_per_game table tbody td[data-stat='trb_per_g']").each(function(i, element) {
              let data = $(element).text()
              trb.push(data);
            });

            // get assists per game
            $("#div_per_game table tbody td[data-stat='ast_per_g']").each(function(i, element) {
              let data = $(element).text()
              ast.push(data);
            });

            // get steals per game
            $("#div_per_game table tbody td[data-stat='stl_per_g']").each(function(i, element) {
              let data = $(element).text()
              stl.push(data);
            });

            // get blocks per game
            $("#div_per_game table tbody td[data-stat='blk_per_g']").each(function(i, element) {
              let data = $(element).text()
              blk.push(data);
            });

            // get turnovers per game
            $("#div_per_game table tbody td[data-stat='tov_per_g']").each(function(i, element) {
              let data = $(element).text()
              tov.push(data);
            });

            // get personal fouls
            $("#div_per_game table tbody td[data-stat='pf_per_g']").each(function(i, element) {
              let data = $(element).text()
              pf.push(data);
            });

            // get ppg
            $("#div_per_game table tbody td[data-stat='pts_per_g']").each(function(i, element) {
              let data = $(element).text()
              ppg.push(data);
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
              season: season[season.length-1],
              age: age[age.length-1],
              team: team[team.length-1],
              position: position[position.length-1],
              gamesPlayed: gamesPlayed[gamesPlayed.length-1],
              gamesStarted: gamesStarted[gamesStarted.length-1],
              minutesPlayed: minutesPlayed[minutesPlayed.length-1],
              fg: fg[fg.length-1],
              fga: fga[fga.length-1],
              fgp: fgp[fgp.length-1],
              threesMade: threesMade[threesMade.length-1],
              threesAttempted: threesAttempted[threesAttempted.length-1],
              threePct: threePct[threePct.length-1],
              twosMade: twosMade[twosMade.length-1],
              twosAttempted: twosAttempted[twosAttempted.length-1],
              twosPct: twosPct[twosPct.length-1],
              efgp: efgp[efgp.length-1],
              ft: ft[ft.length-1],
              fta: fta[fta.length-1],
              ftp: ftp[ftp.length-1],
              orb: orb[orb.length-1],
              drb: drb[drb.length-1],
              trb: trb[trb.length-1],
              ast: ast[ast.length-1],
              stl: stl[stl.length-1],
              blk: blk[blk.length-1],
              tov: tov[tov.length-1],
              pf: pf[pf.length-1],
              ppg: ppg[ppg.length-1],
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
            // and tracking scrape process
            console.log(`records scrapped: ${dataSet.length}`)
            // makes sure dataSet array matches response from DB to scrape all player data
            if (dataSet.length === dbSearchTotal) {

              console.log(`your data scrape is complete`);
              
              dataSet.forEach(item => {
                db.PlayerStats.create({
                  playerName: item.playerName,
                  playerImage: item.playerImage,
                  season: item.season,
                  age: item.age,
                  team: item.team,
                  position: item.position,
                  gamesPlayed: item.gamesPlayed,
                  gamesStarted: item.gamesStarted,
                  minutesPlayed: item.minutesPlayed,
                  fg: item.fg,
                  fga: item.fga,
                  fgp: item.fgp,
                  threesMade: item.threesMade,
                  threesAttempted: item.threesAttempted,
                  threePct: item.threePct,
                  twosMade: item.twosMade,
                  twosAttempted: item.twosAttempted,
                  twosPct: item.twosPct,
                  efgp: item.efgp,
                  ft: item.ft,
                  fta: item.fta,
                  ftp: item.ftp,
                  orb: item.orb,
                  drb: item.drb,
                  trb: item.trb,
                  ast: item.ast,
                  stl: item.stl,
                  blk: item.blk,
                  tov: item.tov,
                  pf: item.pf,
                  ppg: item.ppg,
                  careerMinutes: item.careerMinutes,
                  careerFg: item.careerFg,
                  careerFga: item.careerFga,
                  careerFgp: item.careerFgp,
                  careerThreesMade: item.careerThreesMade,
                  careerThreesAttempted: item.careerThreesAttempted,
                  careerThreePct: item.careerThreePct,
                  careerTwosMade: item.careerTwosMade,
                  careerTwosAttempted: item.careerTwosAttempted,
                  careerTwosPct: item.careerTwosPct,
                  careerEfgp: item.careerEfgp,
                  careerFt: item.careerFt,
                  careerFta: item.careerFta,
                  careerFtp: item.careerFtp,
                  careerOrb: item.careerOrb,
                  careerDrb: item.careerDrb,
                  careerTrb: item.careerTrb,
                  careerAst: item.careerAst,
                  careerStl: item.careerStl,
                  careerBlk: item.careerBlk,
                  careerTov: item.careerTov,
                  careerPf: item.careerPf,
                  careerPpg: item.careerPpg
                })
              })
              res.status(200).json("success")
            }
          })
        })
      }
    }).catch(err => res.status(404).json(err))
  });
};