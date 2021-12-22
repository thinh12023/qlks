const roomBillService = require("./room-bill.service");
const roomService = require("./room.service");
const { RoomBooking, Room, Sequelize, RoomType, Price } = require("../models");
const { TRANG_THAI_THANH_TOAN, TRANG_THAI_PHONG } = require("../constants");
const { Op } = Sequelize;

const createRoomBookings = async ({
  idRooms,
  idBooking,
  status,
  type,
  checkinDate,
  checkinTime,
  checkoutDate,
  checkoutTime,
}) => {
  for (let i = 0; i < idRooms.length; i++) {
    const item = idRooms[i];
    await RoomBooking.create({
      idRoom: item.id,
      idBooking,
      numberOfPerson: item.numberOfPerson,
    });
    const room = await Room.findOne({
      where: {
        id: {
          [Op.eq]: item.id,
        }
      }
    });
    if (
      room.status == TRANG_THAI_PHONG.KHA_DUNG
      || room.status == TRANG_THAI_PHONG.DA_DAT_PHONG
    ) {
      room.status = status;
      await room.save();
    }
    if (status == TRANG_THAI_PHONG.KHACH_DANG_O) {
      const code = await roomBillService.createCodeOfBill();
      if (code) {
        const data = {
          code,
          type,
          status: TRANG_THAI_THANH_TOAN.CHUA_THANH_TOAN,
          checkinDate, checkinTime, checkoutDate, checkoutTime,
          deposit: 0, refund: 0, surcharge: 0, discount: 0,
          totalPayment: 0, totalRoomPayment: 0, totalServicePayment: 0, totalConsignmentPayment: 0,
          idRoom: item.id,
          idBooking,
        };
        await roomBillService.create(data);
      }
    }
  }
}

const getByIdsBooking = async (ids) => {
  const roomBookings = await RoomBooking.findAll({
    attributes: ["idRoom"],
    where: {
      idBooking: {
        [Op.in]: ids,
      },
    },
    group: ["idRoom"],
  });
  let idsRoomBooking = roomBookings.map(i => i.get().idRoom);
  return idsRoomBooking;
}

const updateOldAndAddNew = async (ds, idBooking) => {
  const dsAll = await RoomBooking.findAll({
    where: { idBooking: { [Op.eq]: idBooking } },
  })
  const dsOld = (ds || []).filter(item => item.id);
  const dsNew = (ds || []).filter(item => !item.id);
  const dsDel = (dsAll || []).filter(item => !(dsOld || []).map(i => i.id).includes(item.get().id));
  if (dsOld.length > 0) {
    for (let i = 0; i < dsOld.length; i++) {
      const item = dsOld[i];
      await RoomBooking.update({
        numberOfPerson: item.numberOfPerson,
      }, {
        where: { id: { [Op.eq]: item.id } }
      })
    }
  }
  if (dsNew.length > 0) {
    for (let i = 0; i < dsNew.length; i++) {
      const item = dsNew[i];
      await RoomBooking.create({ idBooking, idRoom: item.idRoom, numberOfPerson: item.numberOfPerson });
      await Room.update({
        status: TRANG_THAI_PHONG.DA_DAT_PHONG,
      }, {
        where: {
          id: { [Op.eq]: item.idRoom }
        }
      })
    }
  }
  if (dsDel.length > 0) {
    for (let i = 0; i < dsDel.length; i++) {
      const item = dsDel[i];
      await RoomBooking.destroy({
        where: { id: { [Op.eq]: item.id } }
      });
      await Room.update({ status: TRANG_THAI_PHONG.KHA_DUNG }, {
        where: {
          id: {
            [Op.eq]: item.idRoom,
          }
        }
      })
    }
  }
}

const getForBooking = async (id) => {
  const roomBookings = await RoomBooking.findAll({
    where: {
      idBooking: { [Op.eq]: id },
    },
    raw: true,
    attributes: ["numberOfPerson", "idRoom", "idBooking"],
  });
  let dsPhongs = [];
  for (let i = 0; i < roomBookings.length; i++) {
    let item = roomBookings[i];
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
  };
  dsPhongs = dsPhongs.filter(item => item.room.status == TRANG_THAI_PHONG.KHACH_DANG_O);
  return dsPhongs;
}

module.exports = {
  createRoomBookings,
  getByIdsBooking,
  updateOldAndAddNew,
  getForBooking,
};