'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RoomType }) {
      // define association here
      this.belongsTo(RoomType, { foreignKey: "idRoomType", as: "room_types" });
    }
  };
  Price.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idRoomType: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_price_roomtype",
      references: {
        model: "room_type",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    tableName: "price",
    modelName: 'Price',
  });
  return Price;
};