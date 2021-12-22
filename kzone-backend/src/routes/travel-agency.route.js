const express = require("express");
const router = express.Router();
const { travelAgencyController } = require("../controllers");
const { checkValidToken, checkRoleAdmin } = require("../middlewares");

/**[GET] */
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?`,
  checkValidToken,
  travelAgencyController.search,
)

/**[POST] */
router.post(
  "/create",
  checkValidToken,
  travelAgencyController.create
);

/**[PUT] */

/**[DELETE] */

module.exports = router;