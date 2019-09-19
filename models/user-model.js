module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageFile: {
      type: DataTypes.BLOB,
      // get() {
      //     return this.getDataValue('img').toString('utf8');
      // },
  }
  });

  Users.associate = function(models) {
    // Associating Users with Lists
    // When a User is deleted, also delete any associated lists of players
    Users.hasMany(models.Lists, {
      onDelete: "cascade"
    });
  };
  return Users;
};