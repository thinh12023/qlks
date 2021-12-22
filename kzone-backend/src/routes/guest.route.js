const express = require("express");
const router = express.Router();
const { guestController } = require("../controllers");

/**[POST] */
//create new guest
router.post("/create", guestController.create);

module.exports = router;