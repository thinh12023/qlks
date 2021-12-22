'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('debt', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalAmountPaid: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      totalAmountOwed: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      idTravelAgency: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_debt_travel-agency",
        references: {
          model: "travel_agency",
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
    await queryInterface.dropTable('debt');
  }
};