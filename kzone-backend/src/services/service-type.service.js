const { ServiceType, Service, Sequelize } = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

//validate service input
const checkValidInput = async (payload) => {
  let errors = {};
  const { name } = payload;
  if (!name) {
    errors.name = "Name must be not empty!";
  }
  return {
    errors,
    valid: Object.keys(errors) <= 0,
  }
}

//create new service
const addServiceType = async (payload) => {
  const { name, note } = payload;
  const newServiceType = await ServiceType.create({
    name,
    note,
  });
  return newServiceType;
}

//update service
const updateServiceType = async (payload, id) => {
  const { name, note } = payload;
  let serviceType = await ServiceType.update({ name, note }, {
    where: {
      id: {
        [Op.eq]: id,
      }
    }
  });
  serviceType = await ServiceType.findOne({
    where: { id },
  })
  return serviceType;
}

//search by id
const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await ServiceType.findAndCountAll({ where: { id } });
  return ({
    data: { count, rows },
    message: "Search service type successfully!",
  });
}

//search
const search = async ({ page = 0, size = 999, name }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = { limit, offset };
  if (name != undefined && name != null && name != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        name: {
          [Op.like]: `%${name}%`,
        },
      }
    }
  }
  const { rows, count } = await ServiceType.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search service type successfully!",
  })
}

module.exports = {
  checkValidInput,
  addServiceType,
  updateServiceType,
  searchById,
  search,
}