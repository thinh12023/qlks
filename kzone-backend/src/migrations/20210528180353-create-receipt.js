'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('receipt', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalMoney: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idDebt: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_receipt_debt",
        references: {
          model: "debt",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idBooking: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_receipt_booking",
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
        name: "fk_receipt_room",
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
    await queryInterface.dropTable('receipt');
  }
};