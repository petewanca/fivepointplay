module.exports = function(sequelize, DataTypes) {
  var Teams = sequelize.define('Teams', {
      teamName: {
        type: DataTypes.STRING,
        // allowNull: false,
        // primaryKey: true
      },
      teamAbv: {
        type: DataTypes.STRING
        // allowNull: false
      },
      teamLink: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      teamLogo: {
        type: DataTypes.STRING,
        // allowNull: false
      }
      // img: {
          // type: DataTypes.BLOB,
          // allowNull: false,
          // get() {
              // return this.getDataValue('img').toString('utf8');
          // },
      // }
  });
  return Teams;
};