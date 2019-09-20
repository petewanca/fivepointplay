module.exports = function(sequelize, DataTypes) {
  var PlayerStats = sequelize.define("PlayerStats", {
    playerName: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    playerImage: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    season: {
       type: DataTypes.INTEGER,
      // allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    team: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    gamesPlayed: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    gamesStarted: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    minutesPlayed: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    fg: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    fga: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    fgp: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    threesMade: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    threesAttempted: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    threePct: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    twosMade: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    twosAttempted: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    twosPct: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    efgp: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    ft: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    fta: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    ftp: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    orb: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    drb: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    trb: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    ast: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    stl: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    blk: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    tov: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    pf: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    ppg: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerMinutes: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerFg: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerFga: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerFgp: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerThreesMade: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerThreesAttempted: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerThreePct: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerTwosMade: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerTwosAttempted: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerTwosPct: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerEfgp: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerFt: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerFta: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerFtp: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerOrb: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerDrb: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerTrb: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerAst: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerStl: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerBlk: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerTov: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerPf: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    careerPpg: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    // imageFile: {
    //   type: DataTypes.BLOB,
    //   allowNull: false,
    //     get() {
    //       return this.getDataValue('img').toString('utf8');
    //     },
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
  
  return PlayerStats;
};