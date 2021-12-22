const { createResponse } = require("../utils/common");
const { Sequelize, sequelize } = require("../models");
const { utilityService } = require("../services");
const { Op } = Sequelize;

const create = async (req, res, next) => {
  try {
    const { name, image, desc } = req.body;
    const utility = await utilityService.create({ name, image, desc });
    if (utility) return res.status(200).json(createResponse(1, utility, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image, name, desc, active } = req.body;
    const utility = await utilityService.update({
      id, name, desc, image, active
    });
    if (utility) return res.status(200).json(createResponse(1, utility, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}
const search = async (req, res, next) => {
  try {
    const { page = 0, size = 10, id, name, active } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await utilityService.searchById({ id });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [...rows],
          totalElement: count,
          currentPage: page,
          totalPage: count < size
            ? 1 : count % size == 0
              ? Math.floor(count / size)
              : (Math.floor(count / size) + 1)
        },
        message
      ));
    }
    else {
      const { data: { count, rows }, message } = await utilityService.search({ page, size, name, active });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [...rows],
          totalElement: count,
          currentPage: page,
          totalPage: count < size
            ? 1 : count % size == 0
              ? Math.floor(count / size)
              : (Math.floor(count / size) + 1)
        },
        message,
      ));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  create,
  update,
  search,
}