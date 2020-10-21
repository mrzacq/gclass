'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StudentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id'
        }
      },
      TaskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tasks',
          key: 'id'
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
    await queryInterface.dropTable('StudentTasks');
  }
};