const express = require("express");
const router = express.Router();
const { checkValidToken, checkRoleAdmin } = require("../middlewares");
const { bookingController } = require("../controllers");

/**[PUT] */
//update booking
router.put(
  "/update/:id",
  checkValidToken,
  bookingController.update
);

router.put(
  "/changeConfirm/:id",
  bookingController.changeConfirm,
);
/**[POST] */
//create booking
router.post(
  "/create",
  checkValidToken,
  bookingController.create
);
//guest checkin
router.post(
  "/guest-checkin",
  checkValidToken,
  bookingController.guestCheckin
);
//guest checkout
router.post(
  "/guest-checkout",
  checkValidToken,
  bookingController.guestCheckout
);
//guest book room
router.post(
  "/guest-book-room",
  bookingController.guestBookRoom,
);


/**[GET] */
//search
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/code=:code([0-9A-Z]{0,}))?(\/status=:status([0-9]{1}))?(\/name=:name([A-z]{0,}))?(\/phone=:phone([0-9]{0,}))?(\/identifyNumber=:identifyNumber([0-9]{0,}))?(\/isConfirm=:isConfirm([01]{1}))?`,
  checkValidToken,
  bookingController.search,
);


//get code book
router.get(
  "/get-code-book",
  checkValidToken,
  bookingController.getCodeBook,
);
//search latest booking: dat phong || thue phong
router.get(
  `/search-latest/:idRoom`,
  checkValidToken,
  bookingController.searchLatest,
);

/**[DELETE] */
router.delete("/delete/:id",bookingController.deleteBooking);

module.exports = router;