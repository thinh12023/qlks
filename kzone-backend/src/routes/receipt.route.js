const express = require("express");
const router = express.Router();
const { receiptController } = require("../controllers");

router.post("/create", receiptController.create);

module.exports = router;