const { Employee, Profile, User, Sequelize } = require("../models");
const { Op } = Sequelize;

const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await Employee.findAndCountAll({
    where: { id },
    include: [
      {
        model: Profile,
        as: "profile",
      },
      {
        model: User,
        as: "user",
      }
    ],
  });
  return ({
    data: { count, rows },
    message: "Search employee successfully!",
  });
}

const search = async ({ page = 0, size = 999, name, phone, email }) => {
  let searchTermProfile = {
    model: Profile,
    as: "profile",
  };
  let searchTerm = {
    limit: size,
    offset: page,
  };
  if (name != undefined && name != null && name != "") {
    searchTermProfile = {
      ...searchTermProfile,
      where: {
        ...searchTermProfile.where,
        unsignedName: {
          [Op.like]: `%${name}%`,
        },
      }
    }
  }
  if (phone != undefined && phone != null && phone != "") {
    searchTermProfile = {
      ...searchTermProfile,
      where: {
        ...searchTermProfile.where,
        phone: {
          [Op.like]: `%${phone}%`,
        },
      }
    }
  }
  if (email != undefined && email != null && email != "") {
    searchTermProfile = {
      ...searchTermProfile,
      where: {
        ...searchTermProfile.where,
        email: {
          [Op.like]: `%${email}%`,
        },
      }
    }
  }
  searchTerm = {
    ...searchTerm,
    include: [
      { ...searchTermProfile },
      {
        model: User,
        as: "user",
      }
    ],
  };
  const { rows, count } = await Employee.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search employee successfully!",
  })
}

module.exports = {
  searchById,
  search,
}