'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomTypeUtility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RoomType, Utility }) {
      // define association here
      this.belongsTo(RoomType, { foreignKey: "idRoomType", as: "room_type" });
      this.belongsTo(Utility, { foreignKey: "idUtility", as: "utility" });
    }
  };
  RoomTypeUtility.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    idRoomType: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_roomtype_utitlity",
      references: {
        model: "room_type",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idUtility: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_roomtype_utitlity_utility",
      references: {
        model: "utility",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'RoomTypeUtility',
    tableName: "roomtype_utility"
  });
  return RoomTypeUtility;
};