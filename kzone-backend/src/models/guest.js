'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Profile, Booking }) {
      // define association here
      this.hasOne(User, {
        foreignKey: "idGuest", as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasOne(Profile, {
        foreignKey: "idGuest", as: "profile",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Booking, {
        foreignKey: "idGuest",
        as: "bookings",
      });
    }
  };
  Guest.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    identifyNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Guest',
    tableName: 'guest',
  });
  return Guest;
};