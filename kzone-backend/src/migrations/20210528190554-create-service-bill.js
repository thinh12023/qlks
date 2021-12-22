'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('service_bill', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPayment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      idBooking: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_service-bill_booking",
        references: {
          model: "booking",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idRoom: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_service-bill_room",
        references: {
          model: "room",
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
    await queryInterface.dropTable('service_bill');
  }
};