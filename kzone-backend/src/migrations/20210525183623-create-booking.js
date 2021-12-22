'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('booking', {
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
      checkinDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      checkoutDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      checkinTime: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      checkoutTime: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isConfirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      typeOfOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      idTravelAgency: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_booking_agency",
        references: {
          model: "travel_agency",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "set null",
      },
      idEmployee: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_booking_employee",
        references: {
          model: "employee",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "set null",
      },
      idGuest: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_booking_guest",
        references: {
          model: "guest",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "set null",
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
    await queryInterface.dropTable('booking');
  }
};