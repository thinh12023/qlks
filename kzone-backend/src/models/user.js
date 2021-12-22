'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Guest, Employee, UserRole, Role }) {
      // define association here
      this.belongsTo(Guest, {
        foreignKey: "idGuest", as: "guest"
      });
      this.belongsTo(Employee, {
        foreignKey: "idEmployee", as: "employee"
      });
      this.belongsToMany(Role, {
        through: UserRole,
        foreignKey: "idGuest",
        otherKey: "idRole",
        as: "roles",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(UserRole, {
        foreignKey: "idUser", as: "user_roles",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  };
  User.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idGuest: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_user_guest",
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
      name: "fk_user_employee",
      references: {
        model: "employee",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  });
  return User;
};