'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idGuest: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_user_guest",
        references: {
          model: "guest",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idEmployee: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_user_employee",
        references: {
          model: "employee",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
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
    await queryInterface.dropTable('user');
  }
};