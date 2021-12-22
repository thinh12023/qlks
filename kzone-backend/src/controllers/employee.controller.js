const { sequelize, Sequelize, User, Employee, Guest, Profile } = require("../models");
const { validateAuthInput, validateProfileInput, createResponse } = require("../utils/common");
const { employeeService } = require("../services");
const bcryptjs = require("bcryptjs");
const { Op } = Sequelize;

/**[POST] */

//create employee
const create = async (req, res, next) => {
  try {
    const {
      username, password, active, role, roleIds, avatar, name, unsignedName, dob, email, gender, address, phone, note, natinality,
    } = req.body;
    //TODO: validate input
    const errorsAuth = validateAuthInput({ username, password });
    const errorsProfile = validateProfileInput({ name, dob, email, address, phone, type: 1 });
    const errors = { ...errorsAuth.errors, ...errorsProfile.errors };
    const valid = errorsAuth.valid && errorsProfile.valid;
    if (!valid) {
      return res.status(422).json({
        code: 0,
        data: {},
        message: errors,
      });
    }
    //check field exist
    const user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(409).json({
        code: 0,
        data: {},
        message: "Username exist!",
      });
    }
    const profile = await Profile.findOne({
      where: {
        [Op.or]: [
          { email },
          { phone },
        ],
      },
      attributes: ["id"],
    });
    if (profile > 0) {
      return res.status(409).json({
        code: 0,
        data: {},
        message: "Email or phone number exist!",
      });
    }

    let result = await sequelize.transaction(async (t) => {
      const newEmp = await Employee.create({ active: active || false }, { transaction: t });
      //create profile
      await newEmp.createProfile({
        name, unsignedName, dob, email, gender: gender != undefined ? gender : 1, address, phone, note: "a", nationality: "vn"
      }, {
        transaction: t,
      });
      //create new user
      pwd = await bcryptjs.hash(password, 12);
      await newEmp.createUser({ username, password: pwd, active, role }, {
        transaction: t,
      });
      return newEmp;
    });

    result = await Employee.findOne({
      where: { id: result.id },
      include: {
        model: Profile,
        as: "profile",
      }
    })

    if (result) {
      return res.status(200).json({
        code: 1,
        data: result,
        message: "Create new employee successfully!",
      })
    }
    else {
      throw new Error("Create employee failed!");
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

/**[GET] */

//search employee
const search = async (req, res, next) => {
  try {
    const { page, size, id, name, email, phone } = req.params;
    if (id) {
      const { data: { count, rows }, message } = await employeeService.searchById({ id });
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
      const { data: { count, rows }, message } = await employeeService.search({ name, email, phone, page, size });
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