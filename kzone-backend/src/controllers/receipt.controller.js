const { createResponse } = require("../utils/common");
const { receiptService } = require("../services");
const { Receipt } = require("../models");

const create = async (req, res, next) => {
  try {
    const { note, description, totalMoney, type, idBooking } = req.body;
    const code = await receiptService.createCodeReceipt();
    const newItem = await Receipt.create({ code, note, description, totalMoney, type, idBooking });
    if (newItem) return res.status(200).json(createResponse(1, newItem, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Internal Error!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal Error!"));
  }
}

module.exports = {
  create,
}