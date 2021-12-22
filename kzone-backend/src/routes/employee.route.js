const express = require("express");
const router = express.Router();
const { checkRoleAdmin, checkValidToken } = require("../middlewares");

const {
  employeeController
} = require("../controllers");

/** create employee */
router.post("/create",
  // checkValidToken,
  // checkRoleAdmin,
  employeeController.create
);

/**search employee */
router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([a-z0-9-]{0,}))?(\/name=:name([a-z]{0,}))?(\/email=:email?)?(\/phone=:phone?)?`,
  checkValidToken,
  employeeController.search
);

module.exports = router;