'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('UserLevel', {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          userId: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'Users',
                  key: 'id'
            },
            allowNull: false
          },
          levelId: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'Levels',
                  key: 'id'
              },
              allowNull: false
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
      });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserLevel');
    }
};
