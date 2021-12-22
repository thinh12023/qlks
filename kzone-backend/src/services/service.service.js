const { ServiceType, Service, Sequelize } = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;


//validate service input
const checkValidInput = async (payload) => {
  let errors = {};
  const { name,image ,price, idServiceType } = payload;
  if (!name) {
    errors.name = "Name must be not empty!";
  }
  if (price == undefined || price == null || price < 0) {
    errors.price = "Price must be not empty!";
  }
  if (!idServiceType) {
    errors.idServiceType = "Service type must be not empty";
  }
  else {
    const serviceType = await ServiceType.findOne({
      where: {
        id: {
          [Op.eq]: idServiceType,
        }
      }
    });
    if (!serviceType) {
      errors.idServiceType = "Service type is not exist!";
    }
  }
  return {
    errors,
    valid: Object.keys(errors) <= 0,
  }
}


//create new service
const addService = async (payload) => {
  const { name,image, price, idServiceType } = payload;
  const newService = await Service.create({
    name,
    image,
    price,
    idServiceType,
  });
  return newService;
}

//update service
const updateService = async (id,payload ) => {
  const { name,image, price, idServiceType }= payload;
  let service = await Service.update({ name,image, price, idServiceType }, {
    where: {
      id
    }
  });
  service = await Service.findOne({
    where: { id },
  })
  return service;
}

//search by id
const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await Service.findAndCountAll({ where: { id } });
  return ({
    data: { count, rows },
    message: "Search service successfully!",
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
  const { rows, count } = await Service.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search service successfully!",
  })
}

module.exports = {
  checkValidInput,
  addService,
  updateService,
  searchById,
  search,
}