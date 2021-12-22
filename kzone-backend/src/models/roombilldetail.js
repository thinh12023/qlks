'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomBillDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RoomBill }) {
      // define association here
      this.belongsTo(RoomBill, { foreignKey: "idRoomBill", as: "roomBill" });
    }
  };
  RoomBillDetail.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    idRoomBill: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_room-bill_detail",
      references: {
        model: "room_bill",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'RoomBillDetail',
    tableName: "room_bill_detail"
  });
  return RoomBillDetail;
};