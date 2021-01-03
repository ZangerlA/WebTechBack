'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      reviewText: {
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.TEXT
      },
      reviewPoints: {
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('Reviews');
  }
};