'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("profile", {
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
      unsignedName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },
      note: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      nationality: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      idGuest: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_profile_guest",
        references: {
          model: "guest",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      idEmployee: {
        type: Sequelize.UUID,
        allowNull: true,
        name: "fk_profile_employee",
        references: {
          model: "employee",
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
    await queryInterface.dropTable("profile");
  }
};