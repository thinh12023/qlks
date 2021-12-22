'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Guest, Employee }) {
      // define association here
      this.belongsTo(Guest, {
        foreignKey: "idGuest", as: "guest"
      });
      this.belongsTo(Employee, {
        foreignKey: "idEmployee", as: "employee"
      });
    }
  };
  Profile.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unsignedName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    note: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    nationality: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    idGuest: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_profile_guest",
      references: {
        model: "guest",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idEmployee: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_profile_employee",
      references: {
        model: "employee",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    tableName: "profile",
    modelName: "Profile",
  });
  return Profile;
};