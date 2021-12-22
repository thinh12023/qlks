'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('service_bill_detail', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      note: {
        type: Sequelize.STRING
      },
      numberOfService: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      totalMoney: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      idServiceBill: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_bill_detail",
        references: {
          model: "service_bill",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idService: {
        type: Sequelize.UUID,
        allowNull: false,
        name: "fk_detail_service",
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
    await queryInterface.dropTable('service_bill_detail');
  }
};