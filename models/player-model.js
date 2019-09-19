module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define("Players", {
    playerName: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    playerLink: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    teamLink: {
      type: DataTypes.STRING,
      // allowNull: false
    }
    // imageFile: {
      // type: DataTypes.BLOB,
      // allowNull: false,
      // get() {
          // return this.getDataValue('img').toString('utf8');
      // },
      // stats in some form here
  // }
  });

  // Players.associate = function(models) {
  //   // We're saying that a player should belong to a team
  //   // A player can't be created without a team due to the foreign key constraint
  //   Players.belongsTo(models.Teams, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  
  return Players;
};

  // playerName;
  // season = [];
  // age = [];
  // team = [];
  // position= [];
  // gamesPlayed = [];
  // gamesStarted = [];
  // minutesPlayed = [];
  // fg = [];
  // fga = [];
  // fgp = [];
  // threesMade = [];
  // threesAttempted = [];
  // threePct = [];
  // twosMade = [];
  // twosAttempted = [];
  // twosPct = [];
  // efgp = [];
  // ft = [];
  // fta = [];
  // ftp = [];
  // orb = [];
  // drb = [];
  // trb = [];
  // ast = [];
  // stl = [];
  // blk = [];
  // tov = [];
  // pf = [];
  // ppg = [];
  // careerMinutes = [];
  // careerFg = [];
  // careerFga = [];
  // careerFgp = [];
  // careerThreesMade = [];
  // careerThreesAttempted = [];
  // careerThreePct = [];
  // careerTwosMade = [];
  // careerTwosAttempted = [];
  // careerTwosPct = [];
  // careerEfgp = [];
  // careerFt = [];
  // careerFta = [];
  // careerFtp = [];
  // careerOrb = [];
  // careerDrb = [];
  // careerTrb = [];
  // careerAst = [];
  // careerStl = [];
  // careerBlk = [];
  // careerTov = [];
  // careerPf = [];
  // careerPpg = [];