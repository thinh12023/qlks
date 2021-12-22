const authRouter = require("./auth.route");
const employeeRouter = require("./employee.route");
const roleRouter = require("./role.route");
const roomTypeRouter = require("./room-type.route");
const roomRouter = require("./room.route");
const floorRouter = require("./floor.route");
const setupRouter = require("./setup.route");
const serviceRouter = require("./service.route");
const serviceTypeRouter = require("./service-type.route");
const bookingRouter = require("./booking.route");
const guestRouter = require("./guest.route");
const travelAgencyRouter = require("./travel-agency.route");
const serviceBillRouter = require("./service-bill.route");
const roomBillRouter = require("./room-bill.route");
const imageRouter = require("./image.route");
const receiptRouter = require("./receipt.route");
const newRouter = require("./new.router");
const eventRouter = require("./event.router");
const mailRouter = require("./mail.route");
const innerRouter = require("./inner.route");
const utilityRouter = require("./utility.route");

module.exports = {
  authRouter,
  employeeRouter,
  roleRouter,
  roomTypeRouter,
  roomRouter,
  floorRouter,
  setupRouter,
  serviceRouter,
  serviceTypeRouter,
  bookingRouter,
  guestRouter,
  travelAgencyRouter,
  serviceBillRouter,
  roomBillRouter,
  imageRouter,
  receiptRouter,
  newRouter,
  eventRouter,
  mailRouter,
  innerRouter,
  utilityRouter,
};