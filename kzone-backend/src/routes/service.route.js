const express = require("express");
const router = express.Router();
const { serviceController } = require("../controllers");
const { checkValidToken } = require("../middlewares");

/**[POST] */
//create service
router.post("/create", checkValidToken, serviceController.create);
/**[PUT] */
//update service
router.put("/update/:id", checkValidToken, serviceController.update);
/**[GET] */
//search service
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/name=:name([A-z]]{0,}))?`,
  serviceController.search
);
/**[DELETE] */
//remove service
router.delete("/delete/:id", checkValidToken, serviceController.remove);

module.exports = router;