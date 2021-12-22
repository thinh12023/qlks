const { News, Sequelize, sequelize } = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

//search by id
const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await News.findAndCountAll({
    where: { id },
  });
  return ({
    data: { count, rows },
    message: "Search news successfully!",
  });
}

//search
const search = async ({ page = 0, size = 999, title }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  };
  if (title != undefined && title != null && title != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        title: {
          [Op.like]: `%${title}%`,
        },
      }
    }
  }
  const { rows, count } = await News.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search news successfully!",
  })
}

const searchRandom = async ({ id, ...payload }) => {
  const { count, rows } = await News.findAndCountAll({ order: Sequelize.literal('random()'), limit: 2,
    where: { id:{[Op.ne] : id}},
  });
  return ({
    data: { count, rows },
    message: "Search inner successfully!",
  });
}

module.exports = {
  search,
  searchById,
  searchRandom
}