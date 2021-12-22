const express = require("express");
const router = express.Router();
const { innerController } = require("../controllers");
const { checkValidToken } = require("../middlewares");

router.post("/create", checkValidToken, innerController.create);

router.put("/update/:id", checkValidToken, innerController.update);

router.get(
  `\/search(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/title=:title([A-z]{0,}))?`,
  innerController.search,
);
router.get(
  `\/searchRandom(\/page=:page([0-9]{0,}))?(\/size=:size([0-9]{0,}))?(\/id=:id([0-9a-z-]{0,}))?(\/title=:title([A-z]{0,}))?`,
  innerController.searchRandom,
);
router.delete("/remove/:id", checkValidToken, innerController.remove);

module.exports = router;