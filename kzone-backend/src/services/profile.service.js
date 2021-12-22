const { Profile } = require("../models");

//create new profile
const create = async ({
  name,
  unsignedName,
  dob,
  email,
  gender,
  address,
  phone,
  note,
  nationality,
  idGuest,
  idEmployee,
}) => {
  const profile = await Profile.create({
    name,
    unsignedName,
    dob,
    email,
    gender,
    address,
    phone,
    note,
    nationality,
    idGuest,
    idEmployee
  });
  return profile;
}

module.exports = {
  create,
}