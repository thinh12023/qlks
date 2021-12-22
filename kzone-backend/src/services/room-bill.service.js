const serviceBillService = require("./service-bill.service");
const { TRANG_THAI_THANH_TOAN, TRANG_THAI_PHIEU, TRANG_THAI_PHONG } = require("../constants");
const {
  RoomBill, Sequelize, sequelize, Room, RoomType, Price,
  Booking, Guest, Profile, TravelAgency, Receipt, ServiceBill,
  RoomBillDetail,
} = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

const createCodeOfBill = async () => {
  let initCode = "HD0000000";
  const count = await RoomBill.count();
  const length = `${count}`.length;
  if (`${count}`.length > initCode.length) {
    initCode = `HD${count}`;
  }
  else {
    const regex = new RegExp(`0{${length}}$`, "g");
    initCode = initCode.replace(regex, `${count}`);
  }
  return initCode;
}

//create
const create = async (payload) => {
  const roomBill = await RoomBill.create(payload);
  return roomBill;
}

//search by room and booking
const searchByRoomAndBooking = async (payload) => {
  const { idRoom, idBooking } = payload;
  const result = await sequelize.transaction(async (t) => {
    let roomBill = await RoomBill.findOne({
      where: {
        [Op.and]: {
          idRoom: {
            [Op.eq]: idRoom,
          },
          idBooking: {
            [Op.eq]: idBooking,
          },
        }
      }
    });
    const room = await Room.findOne({
      where: {
        id: { [Op.eq]: idRoom }
      },
      include: {
        model: RoomType,
        as: "roomType",
        include: {
          model: Price,
          as: "prices",
          order: [["number", "ASC"]]
        }
      }
    });
    const booking = await Booking.findOne({
      where: {
        id: { [Op.eq]: idBooking },
      },
      include: [
        {
          model: Guest,
          as: "guest",
          include: {
            model: Profile,
            as: "profile",
          }
        },
        {
          model: Receipt,
          as: "receipts",
        },
        {
          model: TravelAgency,
          as: "travelAgency",
        }
      ]
    });
    const cosignmentBills = await RoomBill.findAll({
      where: {
        [Op.and]: [
          {
            status: {
              [Op.eq]: TRANG_THAI_THANH_TOAN.KY_GUI,
            },
          },
          {
            idBooking: {
              [Op.eq]: idBooking,
            }
          }
        ]
      }
    });
    const serviceBills = await ServiceBill.findAll({
      where: {
        [Op.and]: [
          {
            idRoomBill: {
              [Op.eq]: roomBill.id,
            },
            status: {
              [Op.eq]: TRANG_THAI_THANH_TOAN.CHUA_THANH_TOAN,
            }
          }
        ]
      }
    });
    roomBill = {
      ...roomBill.toJSON(),
      booking: booking.toJSON(),
      room: room.toJSON(),
      cosignmentBills: cosignmentBills.map(bill => bill.toJSON()),
      serviceBills: serviceBills.map(service => service.toJSON()),
    }
    return roomBill;
  });
  return result;
}

//search phieu thue phong by bookinh va chua thanh toan
const getByBooking = async (idBooking, status) => {
  const roomBills = await RoomBill.findAll({
    where: {
      [Op.and]: {
        idBooking,
        status,
      }
    }
  });
  return roomBills;
}

//confirm guest checkout
const confirmCheckout = async (payload) => {
  const { currentItem, dsHoaDonDichVu, dsHoaDonPhong } = payload;
  const result = await sequelize.transaction(async (t) => {
    const { idBooking } = currentItem;
    const roomBill = await createRoomBill(currentItem);
    if (dsHoaDonPhong && dsHoaDonPhong.length > 0) {
      await createConsignmentRoomBill({
        payload: [...dsHoaDonPhong],
        idConsignmentBill: roomBill.get().id,
      });
    }
    await Booking.update({ status: TRANG_THAI_PHIEU.TRA_PHONG }, {
      where: {
        id: {
          [Op.eq]: idBooking,
        }
      }
    });
    const idPhongs = [
      currentItem.idRoom,
      ...(dsHoaDonPhong || []).map(i => i.idRoom),
    ];
    await await Room.update({
      status: TRANG_THAI_PHONG.CHUA_DON_BUONG,
    }, {
      where: {
        id: {
          [Op.in]: idPhongs,
        }
      }
    });
    //TODO: update hoa don dich vu
    const idsHoaDonDv = (dsHoaDonDichVu || []).map(i => i.id);
    await serviceBillService.updateTrangThaiDs(idsHoaDonDv);
    return true;
  });
  return result;
}

const createRoomBill = async (payload) => {
  const code = await createCodeOfBill();
  const { roomBillDetail, ...data } = payload;
  const roomBill = await RoomBill.create({
    code,
    ...data,
    status: TRANG_THAI_THANH_TOAN.DA_THANH_TOAN,
  });
  for (let i = 0; i < roomBillDetail.length; i++) {
    await roomBill.createRoomBillDetail(roomBillDetail[i]);
  }
  return roomBill;
}

const createConsignmentRoomBill = async ({ payload, idConsignmentBill }) => {
  let dsHoaDonPhong = (payload || []).map(item => ({
    ...item,
    status: TRANG_THAI_THANH_TOAN.DA_THANH_TOAN,
    idConsignmentBill,
  }));
  for (let i = 0; i < dsHoaDonPhong.length; i++) {
    const { roomBillDetail, ...data } = dsHoaDonPhong[i];
    const code = await createCodeOfBill();
    const rc = await RoomBill.create({
      ...data,
      code,
    });
    for (let j = 0; j < roomBillDetail.length; j++) {
      const detail = roomBillDetail[j];
      await rc.createRoomBillDetail(detail);
    }
  }
}

//search by id
const searchById = async ({ id, ...payload }) => {
  const roomBill = await RoomBill.findOne({
    where: { id },
    include: {
      model: RoomBillDetail,
      as: "roomBillDetails",
    },
  });
  const booking = await Booking.findOne({
    where: {
      id: {
        [Op.eq]: roomBill.get().idBooking,
      }
    },
    include: {
      model: Guest,
      as: "guest",
      include: {
        model: Profile,
        as: "profile",
      }
    }
  })
  const roomBillConsignments = await RoomBill.findAll({
    where: {
      idConsignmentBill: {
        [Op.eq]: roomBill.get().id,
      }
    }
  });
  const room = await Room.findOne({
    where: {
      id: {
        [Op.eq]: roomBill.get().idRoom,
      }
    }
  });
  const serviceBills = await ServiceBill.findAll({
    where: {
      idBooking: {
        [Op.eq]: roomBill.get().idBooking,
      },
      idRoom: {
        [Op.eq]: roomBill.get().idRoom,
      }
    }
  })

  return ({
    data: {
      roomBill,
      booking,
      roomBillConsignments,
      room,
      serviceBills,
    },
    message: "Search room bill successfully!",
  });
}

//search
const search = async ({ page = 0, size = 999, status, code }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    order: [["code", "ASC"]],
    include: [
      {
        model: Room,
        as: "room",
      },
    ],
  };
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
  if (code != undefined && code != null && code != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        code,
      }
    }
  }
  const { rows, count } = await RoomBill.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search room bill successfully!",
  })
}

module.exports = {
  searchByRoomAndBooking,
  confirmCheckout,
  createCodeOfBill,
  getByBooking,
  search,
  searchById,
  create,
}