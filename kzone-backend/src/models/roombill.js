'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Debt, RoomBill, RoomBillDetail, ServiceBill, Booking, Room }) {
      // define association here
      this.belongsTo(Debt, { foreignKey: "idDebt", as: "debt" });
      this.belongsTo(RoomBill, { foreignKey: "idConsignmentBill", as: "consignmentBill" });
      this.hasMany(RoomBill, { foreignKey: "idConsignmentBill", as: "consignmentBills" });
      this.hasMany(RoomBillDetail, { foreignKey: "idRoomBill", as: "roomBillDetails" });
      this.belongsTo(Booking, { foreignKey: "idBooking", as: "booking" });
      this.belongsTo(Room, { foreignKey: "idRoom", as: "room" });
    }
  };
  RoomBill.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    type: { //theo gio | ngay | qua dem
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkinDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkinTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    checkoutDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkoutTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    deposit: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    refund: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    surcharge: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    discount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    totalRoomPayment: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    totalServicePayment: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    totalConsignmentPayment: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    totalPayment: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    idRoom: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_room-room",
      references: {
        model: "room",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idBooking: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_room-bill_booking",
      references: {
        model: "booking",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idConsignmentBill: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_room-bill_room-bill",
      references: {
        model: "room_bill",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idDebt: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_room-bill_debt",
      references: {
        model: "debt",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'RoomBill',
    tableName: "room_bill"
  });
  return RoomBill;
};