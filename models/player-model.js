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
      type: DataTypes.STRING,
      // allowNull: false,
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
      type: DataTypes.STRING,
      // allowNull: false,
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