module.exports = function(sequelize, DataTypes) {
	var Players = sequelize.define("Players", {
		playerName: {
			type: DataTypes.STRING
		},
		playerLink: {
			type: DataTypes.STRING
		},
		playerImage: {
			type: DataTypes.STRING
		},
		position: {
			type: DataTypes.STRING
		},
		age: {
			type: DataTypes.STRING
		},
		height: {
			type: DataTypes.STRING
		},
		weight: {
			type: DataTypes.STRING
		},
		teamName: {
			type: DataTypes.STRING
		},
		teamLogo: {
			type: DataTypes.STRING
		}
	});

	return Players;
};
