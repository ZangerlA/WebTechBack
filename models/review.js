const {v4: uuidv4} = require('uuid');

'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {

		static associate(models) {

		}
	};

	Review.init({
		reviewText: {
			type: DataTypes.TEXT,
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},
		reviewPoints: {
			type: DataTypes.DOUBLE,
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},
		Author: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		}
	}, {
		sequelize,
		modelName: 'Review',
	});
	Review.beforeCreate((review, _) => {
		return review.id = uuidv4();
	})

	return Review;
};