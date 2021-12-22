const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const dotenv = require("dotenv");
// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({});

const {
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
} = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use("/images", express.static("src/uploads"));
app.use(cors({}));

//admin
app.use("/auth", authRouter);
app.use("/employee", employeeRouter);
app.use("/role", roleRouter);
app.use("/room-type", roomTypeRouter);
app.use("/room", roomRouter);
app.use("/floor", floorRouter);
app.use("/auto-setup", setupRouter);
app.use("/service", serviceRouter);
app.use("/service-type", serviceTypeRouter);
app.use("/booking", bookingRouter);
app.use("/guest", guestRouter);
app.use("/travel-agency", travelAgencyRouter);
app.use("/service-bill", serviceBillRouter);
app.use("/room-bill", roomBillRouter);
app.use("/image", imageRouter);
app.use("/receipt", receiptRouter);
app.use("/receipt", receiptRouter);
app.use("/news", newRouter);
app.use("/events", eventRouter);
app.use("/mail", mailRouter);
app.use("/inner", innerRouter);
app.use("/utility", utilityRouter);
//client
app.use("/loai-phong", roomTypeRouter);



module.exports = app;
