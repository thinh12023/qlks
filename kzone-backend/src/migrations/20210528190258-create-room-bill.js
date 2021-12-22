'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room_bill', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      checkinDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      checkinTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      checkoutDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      checkoutTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      deposit: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      refund: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      surcharge: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      discount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      totalRoomPayment: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      totalServicePayment: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      totalConsignmentPayment: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      totalPayment: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      idRoom: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_room-room",
        references: {
          model: "room",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idBooking: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_room-bill_booking",
        references: {
          model: "booking",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idConsignmentBill: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_room-bill_room-bill",
        references: {
          model: "room_bill",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idDebt: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_room-bill_debt",
        references: {
          model: "debt",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      checkinDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('room_bill');
  }
};