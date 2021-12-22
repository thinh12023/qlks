const { TRANG_THAI_THANH_TOAN } = require("../constants");
const { Sequelize, sequelize, ServiceBill, ServiceBillDetail, Booking } = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

const create = async (payload) => {
  const { idBooking, idRoom, note, status, totalPayment, listServices } = payload;
  let serviceBill = await sequelize.transaction(async (t) => {
    const sv = await ServiceBill.create({ note, status, totalPayment, idBooking, idRoom });
    for (let i = 0; i < listServices.length; i++) {
      const item = listServices[i];
      await ServiceBillDetail.create({
        numberOfService: item.numberOfService,
        cost: item.cost,
        totalMoney: item.totalMoney,
        idServiceBill: sv.id,
        idService: item.idService,
      });
    }
    return sv;
  });
  serviceBill = await ServiceBill.findOne({
    where: {
      id: { [Op.eq]: serviceBill.id },
    }
  });
  return serviceBill;
}

const getByBooking = async (idBooking, status) => {
  const serviceBills = await ServiceBill.findAll({
    where: {
      [Op.and]: {
        idBooking,
        status,
      }
    },
    attributes: ["id", "status", "totalPayment"],
  });
  return serviceBills;
}

const updateTrangThaiDs = async (ds = []) => {
  await ServiceBill.update({ status: TRANG_THAI_THANH_TOAN.DA_THANH_TOAN }, {
    where: {
      id: {
        [Op.in]: ds,
      }
    }
  });
}

//search by id
const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await ServiceBill.findAndCountAll({
    where: { id },
    include: [
      {
        model: ServiceBillDetail,
        as: "serviceBillDetails",
      },
    ],
  });
  return ({
    data: { count, rows },
    message: "Search service bill successfully!",
  });
}

//search
const search = async ({ page = 0, size = 999, status, codeBooking }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    include: [
      {
        model: ServiceBillDetail,
        as: "serviceBillDetails",
      },
    ],
  };
  if (status != undefined && status != null && status != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        status: {
          [Op.eq]: status,
        },
      }
    }
  }
  if (codeBooking != undefined && codeBooking != null && codeBooking != "") {
    searchTerm = {
      ...searchTerm,
      include: [
        ...searchTerm.include,
        {
          model: Booking,
          as: "booking",
          where: {
            code: {
              [Op.eq]: codeBooking
            }
          }
        }
      ],
    }
  }
  const { rows, count } = await ServiceBill.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search service bill successfully!",
  })
}

module.exports = {
  create,
  search,
  searchById,
  getByBooking,
  updateTrangThaiDs,
}