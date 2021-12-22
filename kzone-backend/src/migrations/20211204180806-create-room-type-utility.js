'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roomtype_utility', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      idRoomType: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_roomtype_utitlity",
        references: {
          model: "room_type",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idUtility: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_roomtype_utitlity_utility",
        references: {
          model: "utility",
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
    await queryInterface.dropTable('roomtype_utility');
  }
};