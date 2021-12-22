const { Role } = require("../models");

const checkRoleExist = async (id) => {
  const role = await Role.findOne({ where: { id } });
  if (role) return true;
  else return false;
}

const checkRolesExist = async (ids) => {
  let isValid = true;
  for (let index = 0; index < ids.length; index++) {
    const id = ids[index];
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      isValid = false;
      break;
    }
  }
  return isValid;
}

module.exports = {
  checkRoleExist,
  checkRolesExist,
}