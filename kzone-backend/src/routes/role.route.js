const express = require("express");
const router = express.Router();

const {
  roleController,
} = require("../controllers");

/**create role */
router.post("/create", roleController.create);

module.exports = router;