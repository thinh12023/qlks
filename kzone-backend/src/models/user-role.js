'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Role }) {
      // define association here
      this.belongsTo(User, { foreignKey: "idUser", as: "user" });
      this.belongsTo(Role, { foreignKey: "idRole", as: "role" });
    }
  };
  UserRole.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    idUser: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_roles_user",
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idRole: {
      type: DataTypes.UUID,
      allowNull: true,
      name: "fk_roles_role",
      references: {
        model: "role",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_role',
  });
  return UserRole;
};