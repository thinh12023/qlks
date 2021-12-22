const express = require("express");
const router = express.Router();
const { newController } = require("../controllers");
const { checkValidToken } = require("../middlewares");

router.post("/create", checkValidToken, newController.create);

router.put("/update/:id", checkValidToken, newController.update);

router.put("/changeHotNews/:id", newController.changeHotNews);

router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/title=:title([A-z]{0,}))?`,
  newController.search,
);

router.get(
  `\/searchRandom(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/title=:title([A-z]{0,}))?`,
  newController.searchRandom,
);
router.get("/search-hot-news", newController.searchHotNews);

router.delete("/remove/:id", checkValidToken, newController.remove);

module.exports = router;