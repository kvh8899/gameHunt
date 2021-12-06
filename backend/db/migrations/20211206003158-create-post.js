'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{model:"Users"}
      },
      header: {
        allowNull:false,
        type: Sequelize.STRING
      },
      subHeader: {
        allowNull:false,
        type: Sequelize.STRING
      },
      headerImage: {
        type: Sequelize.TEXT
      },
      contentImage: {
        type: Sequelize.TEXT
      },
      description: {
        allowNull:false,
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
    return queryInterface.dropTable('Posts');
  }
};