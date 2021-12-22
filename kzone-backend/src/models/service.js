'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ServiceType, ServiceBill, ServiceBillDetail,Image }) {
      // define association here
      this.belongsTo(ServiceType, { foreignKey: "idServiceType", as: "serviceType" });
      this.hasMany(ServiceBillDetail, { foreignKey: "idService", as: "serviceBillDetails" });
      this.belongsToMany(ServiceBill, { through: ServiceBillDetail, foreignKey: "idService", otherKey: "idServiceBill", as: "serviceBills" });
      this.hasMany(Image, { foreignKey: "idService", as: "images" });
    }
  };
  
  Service.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    idServiceType: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_service_service-type",
      references: {
        model: "service_type",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Service',
    tableName: "service",
  });
  return Service;
};