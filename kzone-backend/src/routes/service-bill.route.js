const express = require("express");
const router = express.Router();
const { checkValidToken } = require("../middlewares");
const { serviceBillController } = require("../controllers");

/**[POST] */
//create
router.post("/create", checkValidToken, serviceBillController.create);

/**[GET] */
//search
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/status=:status([01]{1}))?(\/codeBooking=:codeBooking([0-9A-Z]{0,}))?`,
  checkValidToken,
  serviceBillController.search,
);

module.exports = router;