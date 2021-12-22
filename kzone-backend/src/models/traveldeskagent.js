'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelDeskAgent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ TravelAgency }) {
      // define association here
      this.belongsTo(TravelAgency, { foreignKey: TravelAgency, as: "travelAgency" });
    }
  };
  TravelDeskAgent.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idTravelAgency: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "fk_agent_agency",
      references: {
        model: "travel_agency",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "set null"
    },
    note: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'TravelDeskAgent',
    tableName: "travel_desk_agent"
  });
  return TravelDeskAgent;
};