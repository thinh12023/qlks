'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RoomType, Room, Service }) {
      // define association here
      this.belongsTo(RoomType, { foreignKey: "idRoomType", as: "room_types" });
      this.belongsTo(Room, { foreignKey: "idRoom", as: "room" });
      this.belongsTo(Service, { foreignKey: "idService", as: "service" });
    }
  };
  Image.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idRoomType: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_image_roomtype",
      references: {
        model: "room_type",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idRoom: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_image_room",
      references: {
        model: "room",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idService: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_image_service",
      references: {
        model: "service",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'Image',
    tableName: "image",
  });
  return Image;
};