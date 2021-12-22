const { createResponse } = require("../utils/common");
const { setupService } = require("../services");

const build = async (req, res, next) => {
  try {
    const { maxRoomOfFloor, numberOfFloor } = req.body;
    if (!numberOfFloor || !maxRoomOfFloor) return res.status(400).json(createResponse(0, {}, "Some infomation is missing!"));
    const isSuccess = await setupService.build(numberOfFloor, maxRoomOfFloor);
    if (isSuccess) {
      return res.status(200).json(createResponse(1, isSuccess, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  build,
}