const { Receipt, Sequelize } = require("../models");
const { Op } = Sequelize;

const createCodeReceipt = async () => {
  let initCode = "PT0000000";
  const count = await Receipt.count();
  const length = `${count}`.length;
  if (`${count}`.length > (initCode.length - 2)) {
    initCode = `PT${count}`;
  }
  else {
    const regex = new RegExp(`0{${length}}$`, "g");
    initCode = initCode.replace(regex, `${count}`);
  }
  return initCode;
}

const getByTypeAndBooking = async (idBooking, type) => {
  const receipts = await Receipt.findAll({
    where: {
      [Op.and]: { idBooking, type }
    },
    attributes: ["id", "totalMoney", "code", "type"]
  });
  return receipts;
}

module.exports = {
  createCodeReceipt,
  getByTypeAndBooking,
}