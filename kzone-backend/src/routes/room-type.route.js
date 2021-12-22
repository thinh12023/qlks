const express = require("express");
const router = express.Router();
const { roomTypeController } = require("../controllers");
const { checkRoleAdmin, checkValidToken } = require("../middlewares");

/**POST */
//create new room type
router.post("/create", checkValidToken, checkRoleAdmin, roomTypeController.create);

/**PUT */
//update room type
router.put("/update/:id", checkValidToken, checkRoleAdmin, roomTypeController.update);

/**DELETE */
//delete
router.delete("/delete/:id", checkValidToken, checkRoleAdmin, roomTypeController.remove);

/**GET */
//search
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([a-z0-9-]{0,}))?(\/name=:name([A-z]{0,}))?`,
  checkValidToken,
  roomTypeController.search
);

//search client
router.get("(\/id=:id([a-z0-9-]{0,}))?", roomTypeController.searchClient);

module.exports = router;