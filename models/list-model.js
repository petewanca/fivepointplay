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
    // We're saying that a favorite should belong to a User
    // A favorite can't be created without a User due to the foreign key constraint
    Lists.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Lists;
};