'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Service, ServiceBill }) {
      // define association here
      this.belongsTo(Service, { foreignKey: "idService", as: "service" });
      this.belongsTo(ServiceBill, { foreignKey: "idServiceBill", as: "serviceBill" });
    }
  };
  ServiceDetail.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    note: {
      type: DataTypes.STRING
    },
    numberOfService: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalMoney: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    idServiceBill: {
      type: DataTypes.UUID,
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
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_detail_service",
      references: {
        model: "service",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'ServiceBillDetail',
    tableName: "service_bill_detail"
  });
  return ServiceDetail;
};