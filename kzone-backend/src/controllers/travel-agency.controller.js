const { travelAgencyService } = require("../services");
const { validateEmptyInput, createResponse } = require("../utils/common");

//create
const create = async (req, res, next) => {
  try {
    const { tel, note, ...payload } = req.body;
    const { errors, valid } = validateEmptyInput(payload);
    if (!valid) {
      return res.status(422).json({
        code: 0,
        data: {},
        message: errors,
      });
    }
    const travelAgency = await travelAgencyService.create(req.body);
    if (travelAgency) {
      return res.status(200).json(createResponse(1, travelAgency, "Success!"));
    }
    else {
      return res.status(400).json(createResponse(0, {}, "Failed!"));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//search
const search = async (req, res, next) => {
  try {
    const { page, size, id } = req.params;
    if (id) {
      const { data: { count, rows }, message } = await travelAgencyService.searchById({ id });
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
      const { data: { count, rows }, message } = await travelAgencyService.search({ page, size });
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
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  create,
  search,
}