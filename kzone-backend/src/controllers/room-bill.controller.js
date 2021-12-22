const { roomBillService } = require("../services");
const { createResponse } = require("../utils/common");

//search by room and booking
const searchByRoomAndBooking = async (req, res, next) => {
  try {
    const { idRoom, idBooking } = req.params;
    const roomBill = await roomBillService.searchByRoomAndBooking({ idBooking, idRoom });
    if (roomBill) {
      return res.status(200).json(createResponse(1, roomBill, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

//confirm guest checkout
const confirmCheckout = async (req, res, next) => {
  try {
    const { currentItem, dsHoaDonDichVu, dsHoaDonPhong } = req.body;
    const result = roomBillService.confirmCheckout({ currentItem, dsHoaDonDichVu, dsHoaDonPhong });
    if (result) return res.status(200).json(createResponse(1, result, "Success!"));
    else return res.status(400).json(createResponse(0, {}, "Failed!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, error, "Internal error"));
  }
}

//search
const search = async (req, res, next) => {
  try {
    const { page, size, id, code, status } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data, message } = await roomBillService.searchById({ id });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [data],
          totalElement: 1,
          currentPage: page,
          totalPage: 1,
        },
        message
      ));
    }
    else {
      const { data: { count, rows }, message } = await roomBillService.search({ page, size, status, code });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [...rows],
          totalElement: count,
          currentPage: page,
          totalPage: count < size
            ? 1 : count % size == 0
              ? Math.floor(count / size)
              : (Math.floor(count / size) + 1)
        },
        message,
      ));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  searchByRoomAndBooking,
  confirmCheckout,
  search,
}