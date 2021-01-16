'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Reviews',
        'Author',
        {
          type: Sequelize.STRING,
          unique: false,
          allowNull: false
        }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Reviews',
        'Author'
    )
  }
};
