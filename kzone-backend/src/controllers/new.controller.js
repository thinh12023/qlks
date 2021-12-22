const { createResponse } = require("../utils/common");
const { Sequelize, sequelize, News } = require("../models");
const { newsService } = require("../services");
const { Op } = Sequelize;

const create = async (req, res, next) => {
  try {
    const { image, title, desc, content,type,isHotNews } = req.body;
    const news = await News.create({
      image, title, desc, content,type,isHotNews
    })
    if (news) return res.status(200).json(createResponse(1, news, "Success!"));
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
    const news = await News.update({
      image, title, desc, content,type
    }, {
      where: { id }
    })
    if (news) return res.status(200).json(createResponse(1, news, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

const search = async (req, res, next) => {
  try {
    const { page, size, id, title, } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await newsService.searchById({ id });
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
      const { data: { count, rows }, message } = await newsService.search({ page, size, title });
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
    const { data: { count, rows }, message } = await newsService.searchRandom({ id });
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
    const news = await News.destroy({ where: { id } })
    if (news) return res.status(200).json(createResponse(1, true, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

const changeHotNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isHotNews} = req.body;
    const news = await News.update({
      isHotNews
    }, {
      where: { id }
    })
    if (news) return res.status(200).json(createResponse(1, news, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

const searchHotNews = async (req,res,next) => {
  try {
  const {id} = req.params;
  const isHotNews=true;
  const { count, rows } = await News.findAndCountAll({
    where: { isHotNews},
  });
  if (rows) return res.status(200).json(createResponse(1, rows, "Success!"));
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
  changeHotNews,
  searchHotNews,
  searchRandom
}