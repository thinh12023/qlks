'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelAgency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ TravelDeskAgent, Booking, Debt }) {
      // define association here
      this.hasMany(TravelDeskAgent, { foreignKey: "idTravelAgency", as: "travelDeskAgents" });
      this.hasMany(Booking, { foreignKey: "idTravelAgency", as: "bookings" });
      this.hasMany(Debt, { foreignKey: "idTravelAgency", as: "debt" });
    }
  };
  TravelAgency.init({
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
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'TravelAgency',
    tableName: "travel_agency"
  });
  return TravelAgency;
};