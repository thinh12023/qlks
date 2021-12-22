const express = require("express");
const router = express.Router();
const { checkValidToken } = require("../middlewares");

const { setupController } = require("../controllers");

router.post("/info", checkValidToken, setupController.build);

module.exports = router;