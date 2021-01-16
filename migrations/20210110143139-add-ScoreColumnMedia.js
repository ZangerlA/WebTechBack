'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			'Media',
			'mediaScore',
			{
				type: Sequelize.DOUBLE,
				unique: false,
				allowNull: true
			}
		)
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.removeColumn(
			'Media',
			'mediaScore'
		)
	}
};
