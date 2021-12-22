'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room_type', {
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
      numberOfBed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      numberOfPerson: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      dailyRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      overnightRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      monthlyRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      groupRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      familyRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      overGuestNumberRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      hourlyRate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      thumb: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      square: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      direction: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('room_type');
  }
};