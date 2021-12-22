const express = require("express");
const router = express.Router();
const { checkValidToken, checkRoleAdmin } = require("../middlewares");
const { roomController } = require("../controllers");

/**create room */
router.post("/create", checkValidToken, roomController.create);
/**update room */
router.put("/update/:id", checkValidToken, roomController.update);
/**update status room */
router.put("/update-status/:id", checkValidToken, roomController.updateStatus);
/**update active room*/
router.put("/update-active/:id", checkValidToken, roomController.updateActive);
/**delete room */
router.delete("/delete/:id", checkValidToken, roomController.remove);
/**search */
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/status=:status([0-9]{0,}))?(\/idRoomType=:idRoomType([0-9a-z-]{0,}))?(\/idFloor=:idFloor([0-9a-z-]{0,}))?(\/name=:name([0-9A-z]{0,}))?(\/active=:active([01]{1}))?`,
  roomController.search
);
router.get("/get-available-by-date/:checkinDate/:checkoutDate", roomController.getRoomAvailableByDate);
router.get(
  "/update-status/:id/:status",
  checkValidToken,
  roomController.updateStatus
);

router.get("/getRoomReady",roomController.getRoomReady)
router.get("/getRoomNotReady",roomController.getRoomNotReady)
router.get("/getRoomPreorder",roomController.getRoomPreoder)
router.get("/getRoomInUse",roomController.getRoomInUse)

module.exports = router;