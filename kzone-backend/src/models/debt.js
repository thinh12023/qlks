'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RoomBill, Receipt, TravelAgency }) {
      // define association here
      this.hasMany(RoomBill, { foreignKey: "idDebt", as: "roomBills" });
      this.hasMany(Receipt, { foreignKey: "idDebt", as: "receipts" });
      this.belongsTo(TravelAgency, { foreignKey: "idTravelAgency", as: "travelAgency" });
    }
  };
  Debt.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalAmountOwed: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    idTravelAgency: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_debt_travel-agency",
      references: {
        model: "travel_agency",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Debt',
    tableName: "debt",
  });
  return Debt;
};