const db = require("../models")
const cheerio = require("cheerio");
const axios = require("axios");

// all 30 teams
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

// get updated roster for all 30 teams
teamLinks.forEach(team => {
    axios.get(team).then(function(response) {

        const $ = cheerio.load(response.data);
        const results = [];
        const allRosters = [];
        // gets player name and link
        $("#roster tr td[data-stat='player'] a").each(function(i, element) {
            let playerName = $(element).text();
            let playerLink = "https://www.basketball-reference.com" + $(element).attr("href");

            // get individual player and push to array
            results.push({
                team,
                playerName,
                playerLink
            });
            // take array of players and push to array
            // allRosters.push({
            //     team,
            //     results
            // });
        });

        // db.Roster.create({results});
        db.Roster.create(results);
        db.Roster.find().pretty();
        // db.inventory.insertMany([
        //     { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
        //     { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
        //     { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
        //  ])


        // console.log(allRosters);
    });
});