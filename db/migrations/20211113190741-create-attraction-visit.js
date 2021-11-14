'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AttractionVisits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      attractionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Attractions',
          key: 'id',
        },
      },
      visitedOn: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.TEXT
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AttractionVisits');
  }
};