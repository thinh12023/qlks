'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Profile, User }) {
      // define association here
      this.hasOne(Profile, {
        foreignKey: "idEmployee", as: "profile",
      });
      this.hasOne(User, {
        foreignKey: "idEmployee", as: "user",
      })
    }
  };
  Employee.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "avatar-employee.jpg",
    },
    active: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employee',
  });
  return Employee;
};