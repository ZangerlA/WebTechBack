'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.STRING
      },
      mediaType: {
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.ENUM("Movie", "Anime", "Series", "Game")
      },
      description: {
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.TEXT
      },
      imageUrl: {
        unique: false,
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Media');
  }
};