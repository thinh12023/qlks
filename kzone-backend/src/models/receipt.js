'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepositBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Booking, Debt, Room }) {
      // define association here
      this.belongsTo(Booking, { foreignKey: "idBooking", as: "booking" });
      this.belongsTo(Debt, { foreignKey: "idDebt", as: "debt" });
      this.belongsTo(Room, { foreignKey: "idRoom", as: "room" });
    }
  };
  DepositBill.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalMoney: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idDebt: {
      type: DataTypes.UUID,
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
      type: DataTypes.UUID,
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
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_receipt_room",
      references: {
        model: "room",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    tableName: "receipt",
    modelName: 'Receipt',
  });
  return DepositBill;
};