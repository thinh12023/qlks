const { createResponse } = require("../utils/common");
const { Sequelize, sequelize, Inner } = require("../models");
const { innerService } = require("../services");
const { Op } = Sequelize;

const create = async (req, res, next) => {
  try {
    const { image, title, desc, content,type } = req.body;
    const inner = await Inner.create({
      image, title, desc, content,type
    })
    if (inner) return res.status(200).json(createResponse(1, inner, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image, title, desc, content ,type} = req.body;
    const inner = await Inner.update({
      image, title, desc, content,type
    }, {
      where: { id }
    })
    if (inner) return res.status(200).json(createResponse(1, inner, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

const search = async (req, res, next) => {
  try {
    const { page, size, id, title,type } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await innerService.searchById({ id });
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
      const { data: { count, rows }, message } = await innerService.search({ page, size, title });
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
    const { data: { count, rows }, message } = await innerService.searchRandom({ id });
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
    const inner = await Inner.destroy({ where: { id } })
    if (inner) return res.status(200).json(createResponse(1, true, "Success!"));
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
  searchRandom
}