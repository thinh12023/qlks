'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserRole, User }) {
      // define association here
      this.belongsToMany(User, {
        through: UserRole, foreignKey: "idRole", otherKey: "idUser",
        as: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(UserRole, {
        foreignKey: "idRole",
        as: "role_users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  };
  Role.init({
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
      unique: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'role',
  });
  return Role;
};