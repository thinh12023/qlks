const express = require("express");
const router = express.Router();
const { utilityController } = require("../controllers");
const { checkRoleAdmin, checkValidToken } = require("../middlewares");

/**POST */
//create new room type
router.post("/create", utilityController.create);

/**PUT */
//update room type
router.put("/update/:id", utilityController.update);

/**DELETE */
//delete
// router.delete("/delete/:id", utilityController.remove);

/**GET */
//search
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([a-z0-9-]{0,}))?(\/name=:name([A-z]{0,}))?(\/active=:active([01]{0,}))?`,
  utilityController.search
);

module.exports = router;