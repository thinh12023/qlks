'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ RoomType, RoomTypeUtility }) {
      // define association here
      this.belongsToMany(RoomType, {
        through: RoomTypeUtility, foreignKey: "idUtility", otherKey: "idRoomType",
        as: "roomtypes",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(RoomTypeUtility, {
        foreignKey: "idUtility",
        as: "utility_roomtypes",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  };
  Utility.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Utility',
    tableName: "utility",
  });
  return Utility;
};