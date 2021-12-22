'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RoomType, Floor, Booking, RoomBooking, Receipt, RoomBill, ServiceBill,Image }) {
      // define association here
      this.hasMany(RoomBill, { foreignKey: "idRoom", as: "roomBills" });
      this.hasMany(ServiceBill, { foreignKey: "idRoom", as: "serviceBills" });
      this.hasMany(Receipt, { foreignKey: "idRoom", as: "receipts" });
      this.hasMany(RoomBooking, { foreignKey: "idRoom", as: "roomBookings" });
      this.belongsToMany(Booking, { through: RoomBooking, foreignKey: "idRoom", otherKey: "idBooking", as: "bookings" });
      this.belongsTo(RoomType, { foreignKey: "idRoomType", as: "roomType" });
      this.belongsTo(Floor, { foreignKey: "idFloor", as: "floor" });
      this.hasMany(Image, { foreignKey: "idRoom", as: "images" });
    }
  };
  Room.init({
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
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    square: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idRoomType: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_room_roomtype",
      references: {
        model: "room_type",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idFloor: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_room_floor",
      references: {
        model: "floor",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Room',
    tableName: "room",
  });
  return Room;
};