module.exports = function(sequelize, DataTypes) {
	var Stats = sequelize.define("Stats", {
		playerName: {
			type: DataTypes.STRING
		},
		team: {
			type: DataTypes.STRING
		},
		teamLogo: {
			type: DataTypes.STRING
		},
		position: {
			type: DataTypes.STRING
		},
		image: {
			type: DataTypes.STRING
		},
		lsGamesPlayed: {
			type: DataTypes.INTEGER
		},
		lsMinutesPerGame: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsFieldGoalPercentage: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsThreePointPercentage: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsFreeThrowPercentage: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsRebounds: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsBlocks: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsSteals: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsFouls: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsTurnovers: {
			type: DataTypes.DECIMAL(5, 1)
		},
		lsPointsPerGame: {
			type: DataTypes.DECIMAL(5, 1)
		}
	});

	return Stats;
};
