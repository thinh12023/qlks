const { serviceService } = require("../services");
const { createResponse } = require("../utils/common");
const { Service } = require("../models");

//create service
const create = async (req, res, next) => {
  try {
    
    const payload = req.body;
    const { errors, valid } = await serviceService.checkValidInput(payload);
    if (!valid) {
      return res.status(422).json({
        code: 0,
        data: {},
        message: errors,
      })
    }

    //call service
    const service = await serviceService.addService(payload);
    if (service) {     
      return res.status(200).json(createResponse(1, service, "Create successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Create failed!"));
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//update service
const update = async (req, res, next) => {
  try {
    const {name,image, price, idServiceType} = req.body;
    const { id } = req.params;
    //const { errors, valid } = await serviceService.checkValidInput(name,image, price,idServiceType);
    // if (!valid) {
    //   return res.status(422).json({
    //     code: 0,
    //     data: {},
    //     message: errors,
    //   })
    // }
    //call service
    // const service = await serviceService.updateService(id,payload);
    // const { name,image, price, idServiceType }= payload;
    let service = await Service.update({ name,image, price, idServiceType }, {
      where: {
        id
      }
    });
    service = await Service.findOne({
      where: { id },
    })
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
    const count = await Service.destroy({ where: { id } });
    if (count) return res.status(200).json(createResponse(1, {}, "Delete successfully!"));
    else return res.status(400).json(createResponse(0, {}, "Delete failed!"));
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//search service
const search = async (req, res, next) => {
  try {
    const { page,size, name, id } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await serviceService.searchById({ id });
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
      const { data: { count, rows }, message } = await serviceService.search({ name, page, size });
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