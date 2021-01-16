'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserMediaWantToWatch extends Model {

		static associate(models) {
		}
	};

	UserMediaWantToWatch.init({
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
		modelName: 'UserMediaWantToWatch',
	});
	return UserMediaWantToWatch;
};