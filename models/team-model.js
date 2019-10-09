module.exports = function(sequelize, DataTypes) {
	var Teams = sequelize.define("Teams", {
		teamName: {
			type: DataTypes.STRING
		},
		teamLink: {
			type: DataTypes.STRING
		},
		teamLogo: {
			type: DataTypes.STRING
		}
	});
	return Teams;
};
