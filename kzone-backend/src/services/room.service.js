const {
  sequelize,
  Room,
  RoomType,
  Price,
  Floor,
  Sequelize,
} = require("../models");
const { TRANG_THAI_PHONG } = require("../constants");
const { getIdBookingInDate } = require("./booking.service");
const { getByIdsBooking } = require("./room-booking.service");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

//add room
const addRoom = async (payload) => {
  const { name, active, status, note, idRoomType, idFloor, square, image } = payload;
  const room = await sequelize.transaction(async (t) => {
    const newRoom = await Room.create({
      name, active, status, note, idRoomType, idFloor, square, image
    });
    return newRoom;
  });
  return room;
}

//search by id
const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await Room.findAndCountAll({
    where: { id },
    include: [
      {
        model: RoomType,
        as: "roomType",
      },
      {
        model: Floor,
        as: "floor",
      }
    ],
  });
  return ({
    data: { count, rows },
    message: "Search room successfully!",
  });
}

//search
const search = async ({ page = 0, size = 999, status, idRoomType, idFloor, name, active, }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    order: [["name", "ASC"]],
    include: [
      {
        model: RoomType,
        as: "roomType",
      },
      {
        model: Floor,
        as: "floor",
      }
    ],
  };
  if (active != undefined && active != null && active != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        active: {
          [Op.eq]: active == 1 ? true : false,
        },
      }
    }
  }
  if (status != undefined && status != null && status != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        status: {
          [Op.eq]: status,
        },
      }
    }
  }
  if (idRoomType != undefined && idRoomType != null && idRoomType != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        idRoomType: {
          [Op.eq]: idRoomType,
        },
      }
    }
  }
  if (idFloor != undefined && idFloor != null && idFloor != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        idFloor: {
          [Op.eq]: idFloor,
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
  const { rows, count } = await Room.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search RoomType successfully!",
  })
}

//test
const getRoomAvailableByDate = async (checkinDate, checkoutDate) => {
  const bookingIds = await getIdBookingInDate(checkinDate, checkoutDate);
  const idRooms = await getByIdsBooking(bookingIds);
  let { rows, count } = await Room.findAndCountAll({
    atributes: ["id", "name", "active", "status", "note", "idRoomType", "idFloor",],
    order: [["createdAt", "ASC"]],
    where: {
      [Op.and]: {
        id: {
          [Op.notIn]: idRooms,
        },
        active: {
          [Op.eq]: true,
        },
        status: {
          [Op.notIn]: [TRANG_THAI_PHONG.DANG_SUA_PHONG, TRANG_THAI_PHONG.CHUA_DON_BUONG]
        }
      }
    },
  });
  return { data: rows, message: "Success!" };
}



//get room with info room type
const getRoomWithRoomType = async (ds = []) => {
  let dsPhongs = [];
  for (let i = 0; i < ds.length; i++) {
    let item = ds[i];
    let room = await Room.findOne({
      where: {
        id: { [Op.eq]: item.idRoom },
      },
      raw: true,
    });
    let roomType = await RoomType.findOne({
      where: {
        id: { [Op.eq]: room.idRoomType },
      },
    });
    let prices = await Price.findAll({
      where: {
        idRoomType: {
          [Op.eq]: room.idRoomType,
        }
      },
      attributes: ["id", "number", "rate", "type"],
    });
    dsPhongs.push({
      ...item,
      room,
      roomType,
      prices,
    });
  }
  return dsPhongs;
}

const updateTrangThaiDsPhong = async (ds = []) => {
  await Room.update({
    status: TRANG_THAI_PHONG.CHUA_DON_BUONG,
  }, {
    where: {
      id: {
        [Op.in]: ds,
      }
    }
  });
}

const updateStatus = async (id, status) => {
  const room = await Room.findOne({
    where: { id }
  });
  if (
    room &&
    room.status != TRANG_THAI_PHONG.KHACH_DANG_O &&
    room.status != TRANG_THAI_PHONG.DA_DAT_PHONG
  ) {
    await room.update({ status });
    return room;
  }
  else {
    return null;
  }
}

module.exports = {
  addRoom,
  search,
  searchById,
  updateStatus,
  getRoomWithRoomType,
  getRoomAvailableByDate,
  updateTrangThaiDsPhong,
}