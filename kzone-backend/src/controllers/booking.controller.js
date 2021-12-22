const { bookingService } = require("../services");
const { createResponse } = require("../utils/common");
const { Booking } = require("../models")

//create new booking
const create = async (req, res, next) => {
  try {
    const {
      checkinDate, checkinTime, checkoutDate, checkoutTime, idTravelAgency, idEmployee, numberOfPerson, deposit, isConfirm, typeOfOrder, note,
      type, identifyNumber, name, dob, email, nationality, phone, address, status, gender, currency, idRooms
    } = req.body;
    let booking = {};
    // TODO: validate input

    booking = await bookingService.createPhieuDat({
      identifyNumber, name, dob, email, gender, address, phone, note, nationality, numberOfPerson, deposit, isConfirm, typeOfOrder,
      checkinDate, checkinTime, checkoutDate, checkoutTime, type, status, currency, idTravelAgency, idEmployee, idRooms
    });
    if (booking) {
      return res.status(200).json(createResponse(1, booking, "Create booking successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Create booking failed!"));
    }

  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}
//guest checkin
const guestCheckin = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await bookingService.guestCheckin(payload);
    return res.status(200).json(createResponse(1, result, "Successfully!"));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
//guest checkout
const guestCheckout = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await bookingService.guestCheckout(payload);
    if (result) {
      return res.status(200).json(createResponse(1, result, "Successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
//search
const search = async (req, res, next) => {
  try {
    const { page, size, id, code, status, name, phone, identifyNumber, isConfirm } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await bookingService.searchById(id);
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
        message
      ));
    }
    else if (isConfirm != undefined && isConfirm != null && isConfirm != "") {
      const { data: { count, rows }, message } = await bookingService.searchUnconfirmedBooking({ page, size, isConfirm });
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
    else {
      const { data: { count, rows }, message } = await bookingService.search({ page, size, status, name, phone, identifyNumber, isConfirm });
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
//search latest
const searchLatest = async (req, res, next) => {
  try {
    const { idRoom } = req.params;
    const booking = await bookingService.searchLatest(idRoom);
    if (booking) {
      return res.status(200).json(createResponse(1, booking, "Search booking successfully!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Search booking failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}
//get code book
const getCodeBook = async (req, res, next) => {
  try {
    const codeOfBook = await bookingService.createCodeOfBooking();
    return res.status(200).json(createResponse(1, codeOfBook, "Success!"));
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}
//update booking
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { } = req.body;
    const data = await bookingService.update({ id, payload: req.body });
    if (data) {
      return res.status(200).json(createResponse(1, data, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal Errors!"));
  }
}

const guestBookRoom = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await bookingService.guestBookRoom(payload);
    if (result) {
      return res.status(200).json(createResponse(1, result, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal errors"));
  }
}

const changeConfirm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isConfirm = true } = req.body;
    const data = await Booking.update({
      isConfirm
    }, {
      where: { id }
    });
    if (data) {
      return res.status(200).json(createResponse(1, data, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal Errors!"));
  }
}


const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Booking.destroy({ where: { id } });
    if (data) {
      return res.status(200).json(createResponse(1, data, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Internal Errors!"));
  }
}

module.exports = {
  create,
  update,
  search,
  searchLatest,
  getCodeBook,
  guestCheckin,
  guestCheckout,
  guestBookRoom,
  changeConfirm,
  deleteBooking,
}