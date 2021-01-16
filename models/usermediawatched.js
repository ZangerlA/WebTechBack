'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class userMediaWatched extends Model {

		static associate(models) {
		}
	};
	userMediaWatched.init({
		userId: {
			primaryKey: true,
			type: DataTypes.UUID,
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},
		mediumId: {
			primaryKey: true,
			type: DataTypes.UUID,
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		}
	}, {
		sequelize,
		modelName: 'userMediaWatched',
	});
	return userMediaWatched;
};