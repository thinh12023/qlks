const { RoomType, Sequelize, Price, Image, Utility } = require("../models");
const { roomTypeService } = require("../services");
const { createResponse, validateEmptyInput } = require("../utils/common");
const { Op } = Sequelize;

//create new
const create = async (req, res, next) => {
  try {
    const { prices, ...payload } = req.body;
    //validate input
    const { errors, valid } = validateEmptyInput(payload);
    if (!valid) {
      return res.status(422).json({ code: 0, data: {}, message: errors });
    }
    //call service
    const newRoomType = await roomTypeService.create({ ...payload, prices });
    if (newRoomType) {
      return res.status(200).json(createResponse(1, newRoomType, "Create successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Create failed!"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));
  }
}

//update by id
const update = async (req, res, next) => {
  try {
    const { prices, ...payload } = req.body;
    const { id } = req.params;
    //check room type exist
    const isExist = await roomTypeService.checkRoomTypeExist(id);
    if (!isExist) {
      return res.status(404).json(createResponse(0, {}, "Room type is not exist!"));
    }
    //validate input
    const { errors, valid } = validateEmptyInput(payload);
    if (!valid) {
      return res.status(422).json({ code: 0, data: {}, message: errors });
    }
    //call service update
    const roomType = await roomTypeService.update({ ...payload, prices }, id);
    if (roomType) {
      return res.status(200).json(createResponse(1, roomType, "Update successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Update failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//delete by id
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    //check room type exist
    const isExist = await roomTypeService.checkRoomTypeExist(id);
    if (!isExist) {
      return res.status(404).json(createResponse(0, {}, "Room type is not exist!"));
    }
    const result = await roomTypeService.remove(id);
    if (result) {
      return res.status(200).json(createResponse(1, result, "Remove successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, result, "Remove failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//search
const search = async (req, res, next) => {
  try {
    const { page, size, id, name } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await roomTypeService.searchById({ id });
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
      const { data: { count, rows }, message } = await roomTypeService.search({ name, page, size });
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

//search for client
const searchClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const roomType = await RoomType.findOne({
        where: {
          id: {
            [Op.eq]: id,
          }
        },
        include: [
          {
            model: Price,
            as: "prices",
          },
          {
            model: Image,
            as: "images",
          },
          {
            model: Utility,
            as: "utilities",
          }
        ],
      });
      if (roomType) {
        return res.status(200).json(createResponse(1, roomType, "Success!"));
      }
      else {
        return res.status(400).json(createResponse(0, {}, "Room type is not exist!"));
      }
    }
    else {
      const roomTypes = await RoomType.findAll({
        include: [
          {
            model: Price,
            as: "prices",
          },
          {
            model: Image,
            as: "images",
          },
          {
            model: Utility,
            as: "utilities",
          }
        ],
      });
      return res.status(200).json(createResponse(1, (roomTypes || []), "Success!"));
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = {
  create,
  update,
  remove,
  search,
  searchClient,
}