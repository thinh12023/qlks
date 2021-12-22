const { createResponse } = require("../utils/common");
const { guestService } = require("../services");

//create new guest
const create = async (req, res, next) => {
  try {
    const {
      identifyNumber,
      name,
      unsignedName,
      dob,
      email,
      gender,
      address,
      phone,
      note,
      nationality,
    } = req.body;
    const { errors, valid } = guestService.validateInput({
      identifyNumber,
      name,
      unsignedName,
      dob,
      email,
      gender,
      address,
    });
    if (!valid) {
      return res.status(422).json(createResponse(0, {}, errors));
    }
    const guest = await guestService.create({
      identifyNumber,
      name,
      unsignedName,
      dob,
      email,
      gender,
      address,
      phone,
      note,
      nationality,
    });

  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  create,
}