const {v4: uuidv4} = require('uuid');

'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Medium extends Model {

		static associate(models) {
			this.hasMany(models.Review, {
				foreignKey: {
					type: DataTypes.UUID
				}
			})
			models.Review.belongsTo(this);
		}
	};

	Medium.init({
		title: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},

		mediaType: {
			type: DataTypes.ENUM('Movie', 'Anime', 'Series', 'Game'),
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},

		description: {
			type: DataTypes.TEXT,
			unique: false,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		},

		imageUrl: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: true,
		},

		mediaScore: {
			type: DataTypes.DOUBLE,
			unique: false,
			allowNull: true
		},

		genres: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: true
		},

		actors: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: true
		},

		premiered: {
			type: DataTypes.STRING,
			unique: false,
			allowNull: true
		}

	}, {
		sequelize,
		modelName: 'Medium',
	});

	Medium.beforeCreate((medium, _) => {
		return medium.id = uuidv4();
	})

	return Medium;
};
