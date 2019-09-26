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
    playerImage: {
      type: DataTypes.BLOB,
      // allowNull: false,
        get() {
          return this.getDataValue('img').toString('utf8');
        },
    },
    position: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    height: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
     // allowNull: false
    },
    teamName: {
       type: DataTypes.STRING,
      // allowNull: false
    },
    teamLogo: {
      type: DataTypes.BLOB,
      // allowNull: false,
        get() {
          return this.getDataValue('img').toString('utf8');
        },
    }
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