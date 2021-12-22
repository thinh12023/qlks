const express = require("express");
const router = express.Router();
const { serviceTypeController } = require("../controllers");
const { checkValidToken } = require("../middlewares");

/**[POST] */
//create service type
router.post("/create", checkValidToken, serviceTypeController.create);
/**[PUT] */
//update service type
router.put("/update/:id", checkValidToken, serviceTypeController.update);
/**[GET] */
//search service type
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/name=:name([A-z]]{0,}))?`,
  checkValidToken,
  serviceTypeController.search
);
/**[DELETE] */
//remove service type
router.delete("/delete/:id", checkValidToken, serviceTypeController.remove);

module.exports = router;