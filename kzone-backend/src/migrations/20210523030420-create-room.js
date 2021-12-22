'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      square: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idRoomType: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_room_roomtype",
        references: {
          model: "room_type",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idFloor: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_room_floor",
        references: {
          model: "floor",
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
    await queryInterface.dropTable('room');
  }
};