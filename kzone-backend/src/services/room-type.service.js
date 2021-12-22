const { sequelize, RoomType, Room, Image, Price, Sequelize, Utility } = require("../models");
const { addPrices, updatePrices } = require("./price.service");
const { addImages, updateImages } = require("./image.service");
const { addUtilities, updateUtilities } = require("./utility.service");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

//create
const create = async (payload) => {
  const {
    name,
    numberOfBed,
    numberOfPerson,
    dailyRate,
    overnightRate,
    monthlyRate,
    groupRate = 0,
    familyRate = 0,
    overGuestNumberRate,
    hourlyRate,
    prices = [],
    square,
    direction,
    fileList = [],
    utilities = [],
  } = payload;
  let roomType = await RoomType.create({
    name, numberOfBed, numberOfPerson, dailyRate, overnightRate,
    monthlyRate, groupRate, familyRate, overGuestNumberRate, hourlyRate,
    square, direction,
  });
  if (prices.length > 0) await addPrices(prices, roomType.id);
  if (fileList.length > 0) await addImages({
    images: fileList.map(i => ({ path: i.name })),
    idRoomType: roomType.id
  });
  if (utilities.length > 0) {
    const ds = utilities.map(i => ({
      name: i.name,
      desc: i.desc,
      image: i.image,
      active: i.active,
      id: i.id,
    }));
    await addUtilities({
      utilities: [...ds],
      roomType,
    });
  }
  roomType = await RoomType.findOne({
    where: { id: roomType.id },
    include: [
      {
        model: Price,
        as: "prices",
      },
      {
        model: Image,
        as: "images",
      },
      {
        model: Utility,
        as: "utilities",
      }
    ]
  });
  return roomType;
}
//update
const update = async (payload, id) => {
  const {
    name, numberOfBed, numberOfPerson, dailyRate, overnightRate, monthlyRate,
    groupRate, familyRate, overGuestNumberRate, hourlyRate, square, direction,
    prices = [], fileList = [], utilities = [],
  } = payload;
  let roomType;
  await sequelize.transaction(async (t) => {
    await RoomType.update({
      name, numberOfBed, numberOfPerson, dailyRate, overnightRate, monthlyRate,
      groupRate, familyRate, overGuestNumberRate, hourlyRate, square, direction,
    }, {
      where: { id },
    });
    await updatePrices(prices, id);
    await updateImages(fileList, id);
    await updateUtilities(utilities, id);
  })
  roomType = await RoomType.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    }
  });
  return roomType;
}
//remove room type
const remove = async (id) => {
  const result = await sequelize.transaction(async (t) => {
    const { rows, count } = await Room.findAndCountAll({
      where: {
        idRoomType: {
          [Op.eq]: id
        }
      }
    });
    if (count > 0) return false;
    else {
      const res = await RoomType.destroy({ where: { id } });
      return true;
    }
  });
  return result;
}
//check room type exist
const checkRoomTypeExist = async (id) => {
  const roomType = await RoomType.findOne({ where: { id } });
  if (roomType) return true;
  else return false;
}
//search by id
const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await RoomType.findAndCountAll({
    where: { id },
    include: [
      {
        model: Image,
        as: "images",
      },
      {
        model: Price,
        as: "prices",
      },
      {
        model: Utility,
        as: "utilities",
      }
    ],
  });
  return ({
    data: { count, rows },
    message: "Search RoomType successfully!",
  });
}
//search
const search = async ({ page = 0, size = 999, name }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    include: [
      {
        model: Price,
        as: "prices",
      },
      {
        model: Image,
        as: "images",
      },
      {
        model: Utility,
        as: "utilities",
      }
    ],
  };
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
  const { rows, count } = await RoomType.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search RoomType successfully!",
  })
}

module.exports = {
  create,
  update,
  remove,
  search,
  searchById,
  checkRoomTypeExist,
}