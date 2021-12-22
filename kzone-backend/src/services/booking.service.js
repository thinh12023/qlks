const {
  Booking,
  RoomBooking,
  Room,
  Guest,
  Profile,
  TravelAgency,
  Receipt,
  Sequelize,
  sequelize,
} = require("../models");
const moment = require("moment");
const { removeVietnameseTones, getPagination } = require("../utils/common");
const receiptService = require("./receipt.service");
const { getByIdsBooking } = require("./room-booking.service");
const guestService = require("./guest.service");
const serviceBillService = require("./service-bill.service");
const roomBookingService = require("./room-booking.service");
const roomBillService = require("./room-bill.service");
const { LOAI_PHIEU_THU, TRANG_THAI_PHONG, TRANG_THAI_PHIEU, TRANG_THAI_THANH_TOAN, LOAI_THUE_PHONG } = require("../constants");
const { Op } = Sequelize;

const createCodeOfBooking = async () => {
  let initCode = "00000000B";
  const count = await Booking.count();
  const length = `${count}`.length;
  if (`${count}`.length > initCode.length) {
    initCode = `${count}B`;
  }
  else {
    const regex = new RegExp(`0{${length}}B$`, "g");
    initCode = initCode.replace(regex, `${count}B`);
  }
  return initCode;
}
const createPhieuDat = async (payload) => {
  let booking = await sequelize.transaction(async (t) => {
    const code = await createCodeOfBooking();
    const status = payload.status == TRANG_THAI_PHIEU.DAT_PHONG
      ? TRANG_THAI_PHONG.DA_DAT_PHONG
      : payload.status == TRANG_THAI_PHIEU.NHAN_PHONG
        ? TRANG_THAI_PHONG.KHACH_DANG_O
        : TRANG_THAI_PHONG.DA_DAT_PHONG;
    const guest = await guestService.create({
      identifyNumber: payload.identifyNumber,
      name: payload.name,
      unsignedName: removeVietnameseTones(payload.name),
      dob: payload.dob,
      email: payload.email,
      gender: payload.gender,
      address: payload.address,
      phone: payload.phone,
      note: payload.note,
      nationality: payload.nationality,
    });
    const booking = await Booking.create({
      code,
      isConfirm: payload.isConfirm,
      typeOfOrder: payload.typeOfOrder,
      checkinDate: payload.checkinDate,
      checkinTime: payload.checkinTime,
      checkoutDate: payload.checkoutDate,
      checkoutTime: payload.checkoutTime,
      type: payload.type,
      status: payload.status,
      isConfirm: true,
      typeOfOrder: 0,
      discount: 0,
      currency: payload.currency,
      idTravelAgency: payload.idTravelAgency,
      idEmployee: payload.idEmployee,
      idGuest: guest.id,
      idTravelAgency: payload.idTravelAgency,
    });
    if (payload.deposit && payload.deposit > 0) {
      const codeReceipt = await receiptService.createCodeReceipt();
      await booking.createReceipt({
        code: codeReceipt,
        totalMoney: payload.deposit,
        type: LOAI_PHIEU_THU.TRA_TRUOC,
      })
    }
    await roomBookingService.createRoomBookings({
      status,
      type: payload.type,
      idRooms: payload.idRooms,
      idBooking: booking.id,
      checkinDate: payload.checkinDate,
      checkinTime: payload.checkinTime,
      checkoutDate: payload.checkoutDate,
      checkoutTime: payload.checkoutTime,
    });
    return booking;
  });
  booking = await Booking.findOne({
    where: {
      id: {
        [Op.eq]: booking.id,
      }
    },
    include: {
      model: Room,
      as: "rooms",
    }
  });
  return booking;
}
const searchLatest = async (idRoom) => {
  const searchTerm = {
    order: [["createdAt", "ASC"]],
    limit: 1,
    where: {
      [Op.or]: [
        { status: TRANG_THAI_PHIEU.DAT_PHONG },
        { status: TRANG_THAI_PHIEU.NHAN_PHONG }
      ],
    },
    include: [
      {
        model: RoomBooking,
        as: "roomBookings",
        where: {
          idRoom: {
            [Op.eq]: idRoom,
          }
        },
      },
      {
        model: Guest,
        as: "guest",
        include: {
          model: Profile,
          as: "profile",
        }
      },
      {
        model: TravelAgency,
        as: "travelAgency",
      }
    ],
  };
  let booking = await Booking.findOne(searchTerm);
  return booking;
}
const guestCheckin = async (payload) => {
  await sequelize.transaction(async (t) => {
    //update trang thai phongs
    const roomBooking = await RoomBooking.findAll({ where: { idBooking: { [Op.eq]: payload.id } } });
    for (let i = 0; i < roomBooking.length; i++) {
      const item = roomBooking[i];
      await Room.update({ status: TRANG_THAI_PHONG.KHACH_DANG_O }, {
        where: {
          id: {
            [Op.eq]: item.get().idRoom,
          }
        }
      });
    }
    //update booking
    await Booking.update({
      status: TRANG_THAI_PHIEU.NHAN_PHONG,
      checkinDate: payload.checkinDate,
      checkinTime: payload.checkinTime,
    }, {
      where: {
        id: {
          [Op.eq]: payload.id,
        }
      }
    });
  });
  return true;
}
const guestCheckout = async (payload) => {
  //payload: id checkoutDate checkoutTime
  const result = await sequelize.transaction(async (t) => {
    const { id, checkoutDate, checkoutTime } = payload;
    const booking = await Booking.findOne({
      where: { id },
      include: {
        model: Guest,
        as: "guest",
        include: {
          model: Profile,
          as: "profile",
        }
      }
    });
    const roomBookings = await roomBookingService.getForBooking(id);
    const receipts = await receiptService.getByTypeAndBooking(id, LOAI_PHIEU_THU.TRA_TRUOC);
    const serviceBills = await serviceBillService.getByBooking(id, TRANG_THAI_THANH_TOAN.CHUA_THANH_TOAN);
    const roomBills = await roomBillService.getByBooking(id, TRANG_THAI_THANH_TOAN.CHUA_THANH_TOAN);
    roomBookings.map((item) => {
      item.checkinDate = booking.checkinDate;
      item.checkinTime = booking.checkinTime;
      item.checkoutDate = checkoutDate;
      item.checkoutTime = checkoutTime;
      return item;
    });
    return {
      booking,
      roomBookings,
      receipts,
      serviceBills,
      roomBills,
    };
  })
  return result;
}
const getIdBookingInDate = async (checkinDate, checkoutDate) => {
  const bookings = await Booking.findAll({
    attributes: ["id"],
    where: {
      [Op.or]: [
        {
          [Op.and]: {
            checkinDate: {
              [Op.lte]: moment(checkinDate).toDate(),
            },
            checkoutDate: {
              [Op.gte]: moment(checkinDate).toDate()
            }
          }
        },
        {
          [Op.and]: {
            checkinDate: {
              [Op.lte]: moment(checkoutDate).toDate(),
            },
            checkoutDate: {
              [Op.gte]: moment(checkoutDate).toDate(),
            }
          },
        },
        {
          [Op.and]: {
            checkinDate: {
              [Op.gte]: moment(checkinDate).toDate(),
            },
            checkoutDate: {
              [Op.lte]: moment(checkoutDate).toDate()
            }
          },
        }
      ],
    },
  });
  let bookingIds = bookings.map(booking => booking.get().id);
  return bookingIds;
}
//search by id
const searchById = async (id) => {
  const { count, rows } = await Booking.findAndCountAll({
    where: { id },
    include: [
      {
        model: TravelAgency,
        as: "travelAgency",
      },
      {
        model: Receipt,
        as: "receipts",
      },
      {
        model: Guest,
        as: "guest",
        include: {
          model: Profile,
          as: "profile",
        }
      },
      {
        model: RoomBooking,
        as: "roomBookings",
        include: {
          model: Room,
          as: "room",
        }
      },
    ],
  });
  return ({
    data: { count, rows },
    message: "Search booking successfully!",
  });
}

//search unconfirmed booking
const searchUnconfirmedBooking = async (payload) => {
  const { page = 1, size = 10, isConfirm } = payload;
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    where: {
      isConfirm: {
        [Op.eq]: isConfirm == 0 ? false : true,
      }
    },
    include: [
      {
        model: Guest,
        as: "guest",
        include:
        {
          model: Profile,
          as: "profile",
        },
      },
    ]
  };
  const { rows, count } = await Booking.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search unconfirmed bookings successfully!",
  })
}

//search
const search = async (payload) => {
  const { page = 1, size = 10, status, name, phone, identifyNumber, isConfirm, } = payload;
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    include: [
      {
        model: Guest,
        as: "guest",
        include:
        {
          model: Profile,
          as: "profile",
        },
      },
      {
        model: TravelAgency,
        as: "travelAgency",
      }
    ]
  };
  if (status != undefined && status != null) {
    searchTerm = {
      ...searchTerm,
      where: {
        status: {
          [Op.eq]: status,
        }
      }
    }
  }
  if (name != undefined && name != null) {
    searchTerm = {
      ...searchTerm,
      include: [
        {
          model: Guest,
          as: "guest",
          include:
          {
            model: Profile,
            as: "profile",
            where: {
              unsignedName: {
                [Op.eq]: name,
              }
            },
            required: true,
          },
        },
        {
          model: TravelAgency,
          as: "travelAgency",
        }
      ]
    }
  }
  else if (phone != undefined && phone != null) {
    searchTerm = {
      ...searchTerm,
      include: [
        {
          model: Guest,
          as: "guest",
          include:
          {
            model: Profile,
            as: "profile",
            where: {
              phone: {
                [Op.like]: `${phone}`,
              }
            },
            required: true,
          },
          required: true,
        },
        {
          model: TravelAgency,
          as: "travelAgency",
        }
      ]
    }
  }
  if (identifyNumber != undefined && identifyNumber != null) {
    searchTerm = {
      ...searchTerm,
      include: [
        {
          model: Guest,
          as: "guest",
          where: {
            identifyNumber: {
              [Op.eq]: identifyNumber
            }
          },
          include: {
            model: Profile,
            as: "profile",
          },
        },
        {
          model: TravelAgency,
          as: "travelAgency",
        }
      ]
    }
  }

  const { rows, count } = await Booking.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search bookings successfully!",
  })
}
//update
const update = async ({ id, payload }) => {
  await sequelize.transaction(async (t) => {
    const {
      checkinDate,
      checkinTime,
      checkoutDate,
      checkoutTime,
      idTravelAgency,
      note,
      type,
      status,
      identifyNumber,
      name,
      unsignedName,
      dob,
      email,
      phone,
      address,
      gender,
      currency,
      isConfirm,
      typeOfOrder,
      idRooms,
      idGuest,
    } = payload;
    //update guest & profile
    await Guest.update({
      identifyNumber
    }, {
      where: {
        id: {
          [Op.eq]: idGuest,
        }
      },
    });
    await Profile.update({
      name, unsignedName, dob, email, gender, address, phone, note
    }, {
      where: {
        idGuest: {
          [Op.eq]: idGuest,
        }
      }
    });
    //update booking
    await Booking.update({
      checkinDate,
      checkinTime,
      checkoutDate,
      checkoutTime,
      note,
      type,
      status,
      currency,
      isConfirm,
      typeOfOrder,
      idTravelAgency
    }, { where: { id } });
    //update room booking
    await roomBookingService.updateOldAndAddNew(idRooms, id);
  });
  let booking = await Booking.findOne({ where: { id } });
  if (booking) {
    return booking;
  }
  else {
    return null;
  }
}
//guest book room
const guestBookRoom = async (payload) => {
  const {
    checkinDate, checkoutDate, numberOfRoom, name, dob,
    phone, email, address, note, unsignedName, idRoomType,identityNumber
  } = payload;
  const result = await sequelize.transaction(async (t) => {
    const bookingIds = await getIdBookingInDate(checkinDate, checkoutDate);
    const idRooms = await getByIdsBooking(bookingIds);
    let { rows, count } = await Room.findAndCountAll({
      atributes: ["id", "name", "active", "status", "note", "idRoomType", "idFloor"],
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
    if (rows && rows.length > 0) {
      let phongs = rows.filter(i => i.get().idRoomType == idRoomType);
      if (phongs && phongs.length < numberOfRoom) {
        return false;
      }
      else {
        const code = await createCodeOfBooking();
        const guest = await Guest.create({});
        await guest.createProfile({
          name,
          unsignedName,
          dob,
          email,
          gender: 0,
          address,
          phone,
        });
        const booking = await Booking.create({
          code,
          checkinDate,
          checkinTime: "14:00",
          checkoutDate,
          checkoutTime: "12:00",
          type: LOAI_THUE_PHONG.THEO_NGAY,
          status: TRANG_THAI_PHIEU.DAT_PHONG,
          discount: 0,
          currency: "vnd",
          isConfirm: false,
          typeOfOrder: 1,
          note,
          idGuest: guest.get().id,
        });
        for (let i = 0; i < numberOfRoom; i++) {
          await RoomBooking.create({
            numberOfPerson: 1,
            idBooking: booking.get().id,
            idRoom: phongs[i].id,
          });
          await Room.update({ status: TRANG_THAI_PHONG.DA_DAT_PHONG }, {
            where: {
              id: {
                [Op.eq]: phongs[i].id,
              }
            }
          });
        }
        return true;
      }
    }
  });
  return result;
}
module.exports = {
  searchUnconfirmedBooking,
  createCodeOfBooking,
  createPhieuDat,
  searchLatest,
  guestCheckin,
  guestBookRoom,
  getIdBookingInDate,
  guestCheckout,
  searchById,
  search,
  update,
}