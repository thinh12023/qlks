const { createResponse } = require("../utils/common");
const { Sequelize, sequelize, Events } = require("../models");
const { eventsService } = require("../services");
const { Op } = Sequelize;

const create = async (req, res, next) => {
  try {
    const { image, title, desc, content } = req.body;
    const events = await Events.create({
      image, title, desc, content,
    })
    if (events) return res.status(200).json(createResponse(1, events, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image, title, desc, content } = req.body;
    const events = await Events.update({
      image, title, desc, content,
    }, {
      where: { id }
    })
    if (events) return res.status(200).json(createResponse(1, events, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}
const search = async (req, res, next) => {
  try {
    const { page, size, id, title } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await eventsService.searchById({ id });
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
      const { data: { count, rows }, message } = await eventsService.search({ page, size, title });
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

const searchRandom = async (req, res, next) => {
  try{
    const { page, size, id, title,type } = req.params;
    const { data: { count, rows }, message } = await eventsService.searchRandom({ id });
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
  }catch(error){
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));
  }
}
const remove = async (req, res, next) => {
  try {
    const { id } = req.body;
    const events = await Events.destroy({ where: { id } })
    if (events) return res.status(200).json(createResponse(1, true, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

module.exports = {
  create,
  update,
  search,
  remove,
  searchRandom,
}