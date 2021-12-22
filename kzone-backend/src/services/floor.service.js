const { Floor, Sequelize, sequelize } = require("../models");
const { Op } = Sequelize;

//create new
const create = async (payload) => {
  const floor = await sequelize.transaction(async () => {
    const newFloor = await Floor.create(payload);
    return newFloor;
  });
  return floor;
}

//search by id
const searchById = ({ id }) => {

}

//search
const search = async (params) => {

}

module.exports = {
  create,
  searchById,
  search,
}