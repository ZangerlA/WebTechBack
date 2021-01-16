'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
          'Media',
          'genres',
          {
            type: Sequelize.STRING,
            unique: false,
            allowNull: true
          }
      ),
      queryInterface.addColumn(
          'Media',
          'actors',
          {
            type: Sequelize.STRING,
            unique: false,
            allowNull: true
          }
      ) ,
      queryInterface.addColumn(
          'Media',
          'premiered',
          {
            type: Sequelize.STRING,
            unique: false,
            allowNull: true
          }
      )
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Media', 'genres'),
      queryInterface.removeColumn('Media', 'actors'),
      queryInterface.removeColumn('Media', 'premiered')
    ];
  }
};
