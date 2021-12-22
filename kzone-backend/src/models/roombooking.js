'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Booking, Room }) {
      // define association here
      this.belongsTo(Booking, { foreignKey: "idBooking", as: "booking" });
      this.belongsTo(Room, { foreignKey: "idRoom", as: "room" });
    }
  };
  RoomBooking.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    numberOfPerson: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idBooking: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_booking_room_booking",
      references: {
        model: "booking",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    idRoom: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_room_room_booking",
      references: {
        model: "room",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
  }, {
    sequelize,
    modelName: 'RoomBooking',
    tableName: "room_booking",
  });
  return RoomBooking;
};