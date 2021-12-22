const express = require("express");
const router = express.Router();
const { eventController } = require("../controllers");
const { checkValidToken } = require("../middlewares");

router.post("/create",  eventController.create);

router.put("/update/:id", checkValidToken, eventController.update);

router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/title=:title([A-z]{0,}))?`,
  eventController.search,
);

router.get(
  `\/searchRandom(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/title=:title([A-z]{0,}))?`,
  eventController.searchRandom,
);
router.delete("/remove/:id", checkValidToken, eventController.remove);

module.exports = router;