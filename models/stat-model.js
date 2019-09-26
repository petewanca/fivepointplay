module.exports = function(sequelize, DataTypes) {
  var Stats = sequelize.define("Stats", {
    playerName: {
      type: DataTypes.STRING,
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
    image: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    lsMinutesPerGame: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsFieldGoalPercentage: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsThreePointPercentage: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsFreeThrowPercentage: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsRebounds: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsBlocks: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsSteals: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsFouls: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsTurnovers: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    lsPointsPerGame: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerMinutesPerGame: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerFieldGoalPercentage: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerThreePointPercentage: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerFreeThrowPercentage: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerRebounds: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerBlocks: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerlsSteals: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerFouls: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerTurnovers: {
      type: DataTypes.DECIMAL(5,1),
      // allowNull: false
    },
    careerPointsPerGame: {
      type: DataTypes.DECIMAL(5,1),
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
  
  return Stats;
};