'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			'Reviews',
			'MediumId',
			{
				type: Sequelize.UUID,
				references: {
					model: 'Media',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			}
		)
			.then(() => {
				return queryInterface.addColumn(
					'Reviews',
					'UserId',
					{
						type: Sequelize.UUID,
						references: {
							model: 'Users',
							key: 'id'
						},
						onUpdate: 'CASCADE',
						onDelete: 'SET NULL'
					}
				)
			})
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.removeColumn(
			'Reviews',
			'MediumId'
		)
			.then(() => {
				return queryInterface.removeColumn(
					'Reviews',
					'UserId'
				)
			})
	}
};
