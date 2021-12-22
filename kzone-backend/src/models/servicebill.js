'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Booking, ServiceBillDetail, Service, Room }) {
      // define association here
      this.belongsTo(Booking, { foreignKey: "idBooking", as: "booking" });
      this.belongsTo(Room, { foreignKey: "idRoom", as: "room" });
      this.hasMany(ServiceBillDetail, { foreignKey: "idServiceBill", as: "serviceBillDetails" });
      this.belongsToMany(Service, { through: ServiceBillDetail, foreignKey: "idServiceBill", otherKey: "idService", as: "services" });
    }
  };
  ServiceBill.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalPayment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idBooking: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_service-bill_booking",
      references: {
        model: "booking",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'ServiceBill',
    tableName: "service_bill"
  });
  return ServiceBill;
};