module.exports = function(sequelize, DataTypes) {
	var Lists = sequelize.define("Lists", {
		teamName: {
			type: DataTypes.STRING
		},
		playerName: {
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
