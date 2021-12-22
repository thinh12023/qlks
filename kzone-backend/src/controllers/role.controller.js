const {
  sequelize,
  Role,
} = require("../models");

/**[POST] */

//create role
const create = async (req, res, next) => {
  try {
    const { name, value } = req.body;
    let result = await sequelize.transaction(async () => {
      const role = await Role.create({ name, value });
      return role;
    });
    if (result) {
      return res.status(200).json({
        code: 1,
        data: result,
        message: "Create new role successfully!",
      })
    }
    else {
      throw new Error("Create role failed!");
    }
  } catch (error) {
    return res.status(500).json({
      code: 0,
      data: {},
      message: "Something went wrong, please try again later!",
    })
  }
}

module.exports = {
  create,
}