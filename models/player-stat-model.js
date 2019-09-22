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
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    fg: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    fga: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    fgp: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    threesMade: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    threesAttempted: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    threePct: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    twosMade: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    twosAttempted: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    twosPct: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    efgp: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    ft: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    fta: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    ftp: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    orb: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    drb: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    trb: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    ast: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    stl: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    blk: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    tov: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    pf: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    ppg: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerMinutes: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerFg: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerFga: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerFgp: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerThreesMade: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerThreesAttempted: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerThreePct: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerTwosMade: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerTwosAttempted: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerTwosPct: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerEfgp: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerFt: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerFta: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerFtp: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerOrb: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerDrb: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerTrb: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerAst: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerStl: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerBlk: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerTov: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerPf: {
      type: DataTypes.DECIMAL(10,1),
      // allowNull: false
    },
    careerPpg: {
      type: DataTypes.DECIMAL(10,1),
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