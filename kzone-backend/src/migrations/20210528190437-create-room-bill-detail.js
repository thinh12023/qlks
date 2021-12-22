'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room_bill_detail', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      fromDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      toDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      idRoomBill: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_room-bill_detail",
        references: {
          model: "room_bill",
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
    await queryInterface.dropTable('room_bill_detail');
  }
};