const { createResponse } = require("../utils/common");
const { Sequelize, sequelize, Image } = require("../models");
const { eventsService } = require("../services");
const { Op } = Sequelize;

/**[IMAGE] */

const upload = async (req, res, next) => {
  try {
    if (req.file && req.file.filename) {
      return res.status(200).json({
        code: 1,
        message: "Upload successfully!",
        data: {
          filename: req.file.filename,
        }
      })
    }
    else {
      return res.status(400).json({
        code: 0,
        message: "Upload failed!",
        data: {}
      })
    }
  } catch (error) {
    return res.status(500).json({
      code: 0,
      message: "Upload failed!",
      data: {}
    })
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const row = await Image.destroy({ where: { id } });
    if (row) return res.status(200).json(createResponse(1, true, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal error"));
  }
}

module.exports = {
  upload,
  remove,
}