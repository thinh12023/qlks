const { Guest } = require("../models");
const { validateEmptyInput } = require("../utils/common");
//create new guest
const create = async ({
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
}) => {
  let guest = await Guest.create({ identifyNumber });
  await guest.createProfile({
    name,
    unsignedName,
    dob,
    email,
    gender,
    address,
    phone,
    note,
    nationality
  });
  return guest;
}

//validate input
const validateInput = ({
  phone, note, nationality, ...payload
}) => {
  const { errors, valid } = validateEmptyInput(payload);
  return {
    errors,
    valid,
  }
}

module.exports = {
  create,
  validateInput,
}