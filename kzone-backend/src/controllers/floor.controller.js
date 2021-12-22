const { floorService } = require("../services");
const { createResponse, getPagination } = require("../utils/common");
const { Sequelize, Floor } = require("../models");
const { Op } = Sequelize;

/**[POST] */
//create
const create = async (req, res, next) => {
  try {
    const payload = req.body;
    const floor = await floorService.create(payload);
    if (floor) {
      return res.status(200).json(createResponse(1, floor, "Create successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Create failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

/**[GET] */
//search
const search = async (req, res, next) => {
  try {
    const { id, name, page = 0, size = 99 } = req.params;
    if (id) {
      const { count, rows } = await Floor.findAndCountAll({
        where: {
          id: {
            [Op.eq]: id,
          }
        }
      });
      if (floor)
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
      else return res.status(401).json(createResponse(0, {}, "Success!"));
    }
    else {
      const { limit, offset } = getPagination(page, size);
      let searchTerm = {
        limit,
        offset,
      };
      if (name) {
        searchTerm = {
          ...searchTerm,
          where: {
            name: {
              [Op.eq]: `%${name}%`,
            }
          }
        }
      }
      const { rows, count } = await Floor.findAndCountAll(searchTerm);
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
        "Success!"
      ));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  create,
  search,
}