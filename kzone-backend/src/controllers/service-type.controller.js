const { serviceTypeService } = require("../services");
const { createResponse } = require("../utils/common");
const { ServiceType } = require("../models");

//create service type
const create = async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.name) {
      return res.status(422).json({
        code: 0,
        data: {},
        message: errors,
      })
    }
    //call service
    const serviceType = await serviceTypeService.addServiceType(payload);
    if (serviceType) {
      return res.status(200).json(createResponse(1, serviceType, "Create successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Create failed!"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//update service
const update = async (req, res, next) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const { errors, valid } = await serviceTypeService.checkValidInput(payload);
    if (!valid) {
      return res.status(422).json({
        code: 0,
        data: {},
        message: errors,
      })
    }
    //call service
    const service = await serviceTypeService.updateServiceType(payload, id);
    if (service) {
      return res.status(200).json(createResponse(1, service, "Update successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Update failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//remove service
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const count = await ServiceType.destroy({ where: { id } });
    if (count) return res.status(200).json(createResponse(1, {}, "Delete successfully!"));
    else return res.status(400).json(createResponse(0, {}, "Delete failed!"));
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//search service
const search = async (req, res, next) => {
  try {
    const { page, size, name, id } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await serviceTypeService.searchById({ id });
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
      const { data: { count, rows }, message } = await serviceTypeService.search({ name, page, size });
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
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  create,
  update,
  remove,
  search,
}