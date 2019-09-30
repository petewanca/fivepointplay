module.exports = function(sequelize, DataTypes) {
  var Teams = sequelize.define('Teams', {
      teamName: {
        type: DataTypes.STRING,
        // allowNull: false,
        // primaryKey: true
      },
      teamLink: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      teamLogo: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
  });
  return Teams;
};