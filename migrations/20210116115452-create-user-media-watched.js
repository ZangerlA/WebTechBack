'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('userMediaWatcheds', {
			userId: {
				primaryKey: true,
				type: Sequelize.UUID,
				unique: false,
				allowNull: false,
				validate: {
					notEmpty: true,
				}
			},
			mediumId: {
				primaryKey: true,
				type: Sequelize.UUID,
				unique: false,
				allowNull: false,
				validate: {
					notEmpty: true,
				}
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
		await queryInterface.dropTable('userMediaWatcheds');
	}
};