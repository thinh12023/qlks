const { serviceBillService } = require("../services");
const { createResponse } = require("../utils/common");

//create
const create = async (req, res, next) => {
  try {
    const { idBooking, idRoom, note, status, totalPayment, listServices } = req.body;
    // TODO: validate
    const serviceBill = await serviceBillService.create(req.body);
    if (serviceBill) {
      return res.status(200).json(createResponse(1, serviceBill, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

//search
const search = async (req, res, next) => {
  try {
    const { page, size, id, status, codeBooking } = req.params;
    if (id != undefined && id != null && id != "") {
      const { data: { count, rows }, message } = await serviceBillService.searchById({ id });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [...rows],
          totalElement: count,
          currentPage: page,
          totalPage: count < size
            ? 1 : count % size == 0
              ? Math.floor(count / size)
              : (Math.floor(count / size) + 1)
        },
        message
      ));
    }
    else {
      const { data: { count, rows }, message } = await serviceBillService.search({ status, page, size, codeBooking });
      return res.status(200).json(createResponse(
        1,
        {
          contents: [...rows],
          totalElement: count,
          currentPage: page,
          totalPage: count < size
            ? 1 : count % size == 0
              ? Math.floor(count / size)
              : (Math.floor(count / size) + 1)
        },
        message,
      ));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  create,
  search,
}