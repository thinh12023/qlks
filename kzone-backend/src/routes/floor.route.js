const express = require("express");
const router = express.Router();
const { checkRoleAdmin, checkValidToken } = require("../middlewares");

const { floorController } = require("../controllers");

/**create new floor */
router.post("/create", checkValidToken, floorController.create);

/**search floor */
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/name=:name([A-z]{0,}))?`,
  checkValidToken,
  floorController.search
);

module.exports = router;