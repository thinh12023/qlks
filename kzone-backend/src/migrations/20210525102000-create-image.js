'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('image', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idRoomType: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_image_roomtype",
        references: {
          model: "room_type",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idRoom: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_image_room",
        references: {
          model: "room",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idService: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_image_service",
        references: {
          model: "service",
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
    await queryInterface.dropTable('image');
  }
};