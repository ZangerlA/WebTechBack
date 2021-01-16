'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			username: {
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
				type: Sequelize.STRING
			},
			contact_email: {
				unique: false,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
				type: Sequelize.STRING
			},
			pwHash: {
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
				type: Sequelize.STRING
			},
			refreshToken: {
				unique: true,
				allowNull: true,
				type: Sequelize.STRING
			},
			userDescription: {
				unique: false,
				allowNull: true,
				type: Sequelize.TEXT,
			},
			profileImgUrl: {
				unique: false,
				allowNull: true,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users');
	}
};