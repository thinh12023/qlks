const authController = require("./auth.controller");
const employeeController = require("./employee.controller");
const roleController = require("./role.controller");
const roomTypeController = require("./room-type.controller");
const roomController = require("./room.controller");
const floorController = require("./floor.controller");
const setupController = require("./setup.controller");
const serviceController = require("./service.controller");
const serviceTypeController = require("./service-type.controller");
const bookingController = require("./booking.controller");
const guestController = require("./guest.controller");
const travelAgencyController = require("./travel-agency.controller");
const serviceBillController = require("./service-bill.controller");
const roomBillController = require("./room-bill.controller");
const imageController = require("./image.controller");
const receiptController = require("./receipt.controller");
const newController = require("./new.controller");
const eventController = require("./events.controller");
const innerController = require("./inner.controller");
const utilityController = require("./utility.controller");

module.exports = {
  authController,
  employeeController,
  roleController,
  roomTypeController,
  roomController,
  floorController,
  setupController,
  serviceController,
  serviceTypeController,
  bookingController,
  guestController,
  travelAgencyController,
  serviceBillController,
  roomBillController,
  imageController,
  receiptController,
  newController,
  eventController,
  innerController,
  utilityController,
}