const { Sequelize, TravelAgency } = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

const create = async (payload) => {
  const { name, address, tel, mobile, email, note } = payload;
  const code = await createCodeOfTravelAgency();
  const newTravel = await TravelAgency.create({
    code, name, address, tel, mobile, email, note,
  });
  return newTravel;
}

const searchById = async ({ id }) => {
  const { count, rows } = await TravelAgency.findAndCountAll({ where: { id } });
  return ({
    data: { count, rows },
    message: "Search travel agency successfully!",
  });
}

const search = async ({ page, size, ...payload }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = { limit, offset };
  const { rows, count } = await TravelAgency.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search travel agency successfully!",
  })
}

const createCodeOfTravelAgency = async () => {
  let initCode = "CTY000000";
  const count = await TravelAgency.count();
  const length = `${count}`.length;
  if (`${count}`.length > (initCode.length - 3)) {
    initCode = `CTY${count}`;
  }
  else {
    const regex = new RegExp(`0{${length}}$`, "g");
    initCode = initCode.replace(regex, `${count}B`);
  }
  return initCode;
}

module.exports = {
  create,
  search,
  searchById,
  createCodeOfTravelAgency,
}