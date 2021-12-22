'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room_booking', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      numberOfPerson: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idBooking: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_booking_room_booking",
        references: {
          model: "booking",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      idRoom: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_room_room_booking",
        references: {
          model: "room",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
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
    await queryInterface.dropTable('room_booking');
  }
};