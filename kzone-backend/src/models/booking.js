'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, TravelAgency, Guest, RoomBooking, Receipt, RoomBill, ServiceBill }) {
      // define association here
      this.hasMany(RoomBooking, { foreignKey: "idBooking", as: "roomBookings" });
      this.belongsToMany(Room, { through: RoomBooking, foreignKey: "idBooking", otherKey: "idRoom", as: "rooms" });
      this.belongsTo(TravelAgency, { foreignKey: "idTravelAgency", as: "travelAgency" });
      this.belongsTo(Guest, { foreignKey: "idGuest", as: "guest" });
      this.hasMany(RoomBill, { foreignKey: "idBooking", as: "roomBills" });
      this.hasMany(Receipt, { foreignKey: "idBooking", as: "receipts" });
      this.hasMany(ServiceBill, { foreignKey: "idBooking", as: "serviceBills" });
    }
  };
  Booking.init({
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
    checkinDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    checkoutDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    checkinTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    checkoutTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isConfirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    typeOfOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    idTravelAgency: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_booking_agency",
      references: {
        model: "travel_agency",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "set null",
    },
    idEmployee: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_booking_employee",
      references: {
        model: "employee",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "set null",
    },
    idGuest: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_booking_guest",
      references: {
        model: "guest",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "set null",
    },
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: "booking",
  });
  return Booking;
};