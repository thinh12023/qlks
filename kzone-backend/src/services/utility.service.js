const {
  sequelize,
  Utility,
  RoomTypeUtility,
  Sequelize,
} = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

// add
const create = async (payload) => {
  const { name, desc, image } = payload;
  const utility = await sequelize.transaction(async (t) => {
    const item = await Utility.create({
      name, desc, image, active: true,
    });
    return item;
  });
  return utility;
}

// search by id
const searchById = async ({ id }) => {
  const { count, rows } = await Utility.findAndCountAll({
    where: { id },
    include: [],
  });
  return ({
    data: { count, rows },
    message: "Search utility successfully!",
  });
}

// search
const search = async ({ page = 0, size = 999, name, active }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    order: [["name", "ASC"]],
    include: [],
  };
  if (active != undefined && active != null && active != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        active: {
          [Op.eq]: active == 0 ? true : false,
        },
      }
    }
  }
  if (name != undefined && name != null && name != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        name: {
          [Op.like]: `%${name}%`,
        },
      }
    }
  }
  const { rows, count } = await Utility.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search utility successfully!",
  })
}

// update
const update = async ({ id, name, desc, image, active }) => {
  const utility = await Utility.findOne({
    where: { id }
  });
  if (utility) {
    await utility.update({ name, desc, image, active });
    return utility;
  }
  else {
    return null;
  }
}

//add utilities
const addUtilities = async ({ utilities, roomType }) => {
  for (let i = 0; i < utilities.length; i++) {
    const utility = utilities[i];
    await RoomTypeUtility.create({
      idRoomType: roomType.id,
      idUtility: utility.id,
    });
  }
}

// update utilities
const updateUtilities = async (utilities, idRoomType) => {
  // if (utilities.length == 0) return;
  let allItems = await RoomTypeUtility.findAll({
    where: {
      idRoomType: {
        [Op.eq]: idRoomType,
      }
    },
    raw: true,
    nest: true,
  });
  const newUtilities = utilities.filter(item => !item.RoomTypeUtility);
  const oldUitlities = utilities.filter(item => item.RoomTypeUtility != undefined || item.RoomTypeUtility != null);
  let oldIds = oldUitlities.map(i => i.id);
  let deletedItems = [];
  for (let i = 0; i < allItems.length; i++) {
    if (!oldIds.includes(allItems[i].idUtility)) {
      deletedItems.push(allItems[i]);
    }
  }

  if (deletedItems.length > 0) {
    for (let i = 0; i < deletedItems.length; i++) {
      const utility = deletedItems[i];
      await RoomTypeUtility.destroy({
        where: {
          id: {
            [Op.eq]: utility.id,
          }
        },
      });
    }
  }

  if (newUtilities.length > 0) {
    for (let i = 0; i < newUtilities.length; i++) {
      const utility = newUtilities[i];
      await RoomTypeUtility.create({
        idRoomType,
        idUtility: utility.id,
      });
    }
  }
}

module.exports = {
  create,
  search,
  searchById,
  update,
  addUtilities,
  updateUtilities,
}