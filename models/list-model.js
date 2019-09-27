module.exports = function(sequelize, DataTypes) {
  var Lists = sequelize.define("Lists", {
    playerName: {
      type: DataTypes.INTEGER
    },
    commonName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Lists.associate = function(models) {
    Lists.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Lists;
};