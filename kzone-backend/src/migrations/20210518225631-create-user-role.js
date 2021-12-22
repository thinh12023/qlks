'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_role', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      idUser: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_roles_user",
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idRole: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_roles_role",
        references: {
          model: "role",
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
    await queryInterface.dropTable('user_role');
  }
};