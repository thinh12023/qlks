const express = require("express");
const router = express.Router();
const { roomBillController } = require("../controllers");
const { checkValidToken } = require("../middlewares");

/**[POST] */
//confirm guest checkout:
router.post(
  "/confirm-checkout",
  checkValidToken,
  roomBillController.confirmCheckout
);

/**[GET] */
//search by room and booking
router.get(
  "/search-by-room-and-booking/:idRoom/:idBooking",
  checkValidToken,
  roomBillController.searchByRoomAndBooking
);

//search
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/code=:code([0-9A-Z]{0,}))?(\/status=:status([0-9]{1}))?`,
  checkValidToken,
  roomBillController.search,
);

module.exports = router;