var cheerio = require("cheerio");
var axios = require("axios");

axios
	.get("https://www.basketball-reference.com/players/p/parsoch01.html")
	.then((response) => {
		var $ = cheerio.load(response.data);
		var results = [];
		var playerName;
		var season = [];
		var age = [];
		var team = [];
		var position = [];
		var gamesPlayed = [];
		var gamesStarted = [];
		var minutesPlayed = [];
		var fg = [];
		var fga = [];
		var fgp = [];
		var threesMade = [];
		var threesAttempted = [];
		var threePct = [];
		var twosMade = [];
		var twosAttempted = [];
		var twosPct = [];
		var efgp = [];
		var ft = [];
		var fta = [];
		var ftp = [];
		var orb = [];
		var drb = [];
		var trb = [];
		var ast = [];
		var stl = [];
		var blk = [];
		var tov = [];
		var pf = [];
		var ppg = [];
		var careerMinutes = [];
		var careerFg = [];
		var careerFga = [];
		var careerFgp = [];
		var careerThreesMade = [];
		var careerThreesAttempted = [];
		var careerThreePct = [];
		var careerTwosMade = [];
		var careerTwosAttempted = [];
		var careerTwosPct = [];
		var careerEfgp = [];
		var careerFt = [];
		var careerFta = [];
		var careerFtp = [];
		var careerOrb = [];
		var careerDrb = [];
		var careerTrb = [];
		var careerAst = [];
		var careerStl = [];
		var careerBlk = [];
		var careerTov = [];
		var careerPf = [];
		var careerPpg = [];

		// get player name
		$("h1[itemprop='name']").each(function(i, element) {
			playerName = $(element).text();
		});

		// gets seasons
		$("#div_per_game table tbody th[data-stat='season']").each(function(
			i,
			element
		) {
			var seasons = $(element).text();
			season.push(seasons);
		});

		// get ages
		$("#div_per_game table tbody td[data-stat='age']").each(function(
			i,
			element
		) {
			var ages = $(element).text();
			age.push(ages);
		});

		// get teams
		$("#div_per_game table tbody td[data-stat='team_id']").each(function(
			i,
			element
		) {
			var teams = $(element).text();
			team.push(teams);
		});

		// get position
		$("#div_per_game table tbody td[data-stat='pos']").each(function(
			i,
			element
		) {
			var pos = $(element).text();
			position.push(pos);
		});

		// get games played
		$("#div_per_game table tbody td[data-stat='g']").each(function(
			i,
			element
		) {
			var games = $(element).text();
			gamesPlayed.push(games);
		});

		// get games started
		$("#div_per_game table tbody td[data-stat='gs']").each(function(
			i,
			element
		) {
			var started = $(element).text();
			gamesStarted.push(started);
		});

		// get minutes played
		$("#div_per_game table tbody td[data-stat='mp_per_g']").each(function(
			i,
			element
		) {
			var mins = $(element).text();
			minutesPlayed.push(mins);
		});

		// get field goals per game
		$("#div_per_game table tbody td[data-stat='fg_per_g']").each(function(
			i,
			element
		) {
			var fgs = $(element).text();
			fg.push(fgs);
		});

		// get field goal attempts per game
		$("#div_per_game table tbody td[data-stat='fga_per_g']").each(function(
			i,
			element
		) {
			var attempted = $(element).text();
			fga.push(attempted);
		});

		// get field goal percentage
		$("#div_per_game table tbody td[data-stat='fg_pct']").each(function(
			i,
			element
		) {
			var fgpct = $(element).text();
			fgp.push(fgpct);
		});

		// get threes made per game
		$("#div_per_game table tbody td[data-stat='fg3_per_g']").each(function(
			i,
			element
		) {
			var tpg = $(element).text();
			threesMade.push(tpg);
		});

		// get threes attempted per game
		$("#div_per_game table tbody td[data-stat='fg3a_per_g']").each(function(
			i,
			element
		) {
			var fg3a = $(element).text();
			threesAttempted.push(fg3a);
		});

		// get three point percentage
		$("#div_per_game table tbody td[data-stat='fg3_pct']").each(function(
			i,
			element
		) {
			var fg3pct = $(element).text();
			threePct.push(fg3pct);
		});

		// get twos made per game
		$("#div_per_game table tbody td[data-stat='fg2_per_g']").each(function(
			i,
			element
		) {
			var fg2 = $(element).text();
			twosMade.push(fg2);
		});

		// get twos attempted per game
		$("#div_per_game table tbody td[data-stat='fg2a_per_g']").each(function(
			i,
			element
		) {
			var fg2a = $(element).text();
			twosAttempted.push(fg2a);
		});

		// get two point percentage
		$("#div_per_game table tbody td[data-stat='fg2_pct']").each(function(
			i,
			element
		) {
			var fg2pct = $(element).text();
			twosPct.push(fg2pct);
		});

		// get effective fg percentage
		$("#div_per_game table tbody td[data-stat='efg_pct']").each(function(
			i,
			element
		) {
			var efg_pct = $(element).text();
			efgp.push(efg_pct);
		});

		// get free throws per game
		$("#div_per_game table tbody td[data-stat='ft_per_g']").each(function(
			i,
			element
		) {
			var freethrows = $(element).text();
			ft.push(freethrows);
		});

		// get free throws attempted per game
		$("#div_per_game table tbody td[data-stat='fta_per_g']").each(function(
			i,
			element
		) {
			var ftattempted = $(element).text();
			fta.push(ftattempted);
		});

		// get free throw percentage
		$("#div_per_game table tbody td[data-stat='ft_pct']").each(function(
			i,
			element
		) {
			var ft_pct = $(element).text();
			ftp.push(ft_pct);
		});

		// get offensive rebounds per game
		$("#div_per_game table tbody td[data-stat='orb_per_g']").each(function(
			i,
			element
		) {
			var offrebounds = $(element).text();
			orb.push(offrebounds);
		});

		// get defensive rebounds per game
		$("#div_per_game table tbody td[data-stat='drb_per_g']").each(function(
			i,
			element
		) {
			var defrebounds = $(element).text();
			drb.push(defrebounds);
		});

		// get total rebounds per game
		$("#div_per_game table tbody td[data-stat='trb_per_g']").each(function(
			i,
			element
		) {
			var totalreb = $(element).text();
			trb.push(totalreb);
		});

		// get assists per game
		$("#div_per_game table tbody td[data-stat='ast_per_g']").each(function(
			i,
			element
		) {
			var assists = $(element).text();
			ast.push(assists);
		});

		// get steals per game
		$("#div_per_game table tbody td[data-stat='stl_per_g']").each(function(
			i,
			element
		) {
			var steals = $(element).text();
			stl.push(steals);
		});

		// get blocks per game
		$("#div_per_game table tbody td[data-stat='blk_per_g']").each(function(
			i,
			element
		) {
			var blocks = $(element).text();
			blk.push(blocks);
		});

		// get turnovers per game
		$("#div_per_game table tbody td[data-stat='tov_per_g']").each(function(
			i,
			element
		) {
			var to = $(element).text();
			tov.push(to);
		});

		// get personal fouls
		$("#div_per_game table tbody td[data-stat='pf_per_g']").each(function(
			i,
			element
		) {
			var pfs = $(element).text();
			pf.push(pfs);
		});

		// get ppg
		$("#div_per_game table tbody td[data-stat='pts_per_g']").each(function(
			i,
			element
		) {
			var points = $(element).text();
			ppg.push(points);
		});

		// get career minutes averaged
		$("#div_per_game table tfoot tr td[data-stat='mp_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerMinutes.push(data);
			}
		);

		// get career field goals made avg
		$("#div_per_game table tfoot tr td[data-stat='fg_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerFg.push(data);
			}
		);

		// get career field goals attempted avg
		$("#div_per_game table tfoot tr td[data-stat='fga_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerFga.push(data);
			}
		);

		// get career field goal pct
		$("#div_per_game table tfoot tr td[data-stat='fg_pct']").each(function(
			i,
			element
		) {
			var data = $(element).text();
			careerFgp.push(data);
		});

		// get career three points made avg
		$("#div_per_game table tfoot tr td[data-stat='fg3_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerThreesMade.push(data);
			}
		);

		// get career three point attempts avg
		$("#div_per_game table tfoot tr td[data-stat='fg3a_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerThreesAttempted.push(data);
			}
		);

		// get career three point pct
		$("#div_per_game table tfoot tr td[data-stat='fg3_pct']").each(function(
			i,
			element
		) {
			var data = $(element).text();
			careerThreePct.push(data);
		});

		// get career two points made avg
		$("#div_per_game table tfoot tr td[data-stat='fg2_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerTwosMade.push(data);
			}
		);

		// get career two point attempts avg
		$("#div_per_game table tfoot tr td[data-stat='fg2a_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerTwosAttempted.push(data);
			}
		);

		// get career two point pct
		$("#div_per_game table tfoot tr td[data-stat='fg2_pct']").each(function(
			i,
			element
		) {
			var data = $(element).text();
			careerTwosPct.push(data);
		});

		// get career field goal efc pct
		$("#div_per_game table tfoot tr td[data-stat='efg_pct']").each(function(
			i,
			element
		) {
			var data = $(element).text();
			careerEfgp.push(data);
		});

		// get career free throws made avg
		$("#div_per_game table tfoot tr td[data-stat='ft_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerFt.push(data);
			}
		);

		// get career free throw attempt avg
		$("#div_per_game table tfoot tr td[data-stat='fta_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerFta.push(data);
			}
		);

		// get career free throw pct
		$("#div_per_game table tfoot tr td[data-stat='ft_pct']").each(function(
			i,
			element
		) {
			var data = $(element).text();
			careerFtp.push(data);
		});

		// get career offensive reb avg
		$("#div_per_game table tfoot tr td[data-stat='orb_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerOrb.push(data);
			}
		);

		// get career defensive reb avg
		$("#div_per_game table tfoot tr td[data-stat='drb_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerDrb.push(data);
			}
		);

		// get career total reb avg
		$("#div_per_game table tfoot tr td[data-stat='trb_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerTrb.push(data);
			}
		);

		// get career total assists avg
		$("#div_per_game table tfoot tr td[data-stat='ast_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerAst.push(data);
			}
		);

		// get career total steals avg
		$("#div_per_game table tfoot tr td[data-stat='stl_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerStl.push(data);
			}
		);

		// get career total blocks avg
		$("#div_per_game table tfoot tr td[data-stat='blk_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerBlk.push(data);
			}
		);

		// get career turnover avg
		$("#div_per_game table tfoot tr td[data-stat='tov_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerTov.push(data);
			}
		);

		// get career fouls avg
		$("#div_per_game table tfoot tr td[data-stat='pf_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerPf.push(data);
			}
		);

		// get career ppg avg
		$("#div_per_game table tfoot tr td[data-stat='pts_per_g']").each(
			function(i, element) {
				var data = $(element).text();
				careerPpg.push(data);
			}
		);

		// player statistics results object
		results.push({
			playerName,
			season,
			age,
			team,
			position,
			gamesPlayed,
			gamesStarted,
			minutesPlayed,
			fg,
			fga,
			fgp,
			threesMade,
			threesAttempted,
			threePct,
			twosMade,
			twosAttempted,
			twosPct,
			efgp,
			ft,
			fta,
			ftp,
			orb,
			drb,
			trb,
			ast,
			stl,
			blk,
			tov,
			pf,
			ppg,
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
	})
	.catch((err) => console.log(err));
