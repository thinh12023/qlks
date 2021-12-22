const { User, Profile, Employee } = require("../models");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../utils/common");
// const { roleService } = require("../services");

const authenticate = async ({ username, password, ...payload }) => {
  try {
    const user = await User.findOne({
      where: { username }, include: {
        model: Employee,
        as: "employee",
        include: {
          model: Profile,
          as: "profile"
        }
      }
    });
    if (!user) return ({ data: null, message: "Account doesn't exist!" });
    const match = await bcryptjs.compare(password, user.password);
    if (!match) return ({ data: null, message: "Password incorrect!" });
    else {
      const token = generateToken({ id: user.id, username, email: user.employee.profile.email });
      return ({
        data: {
          id: user.id,
          name: user.employee.profile.name,
          username,
          email: user.employee.profile.email,
          accessToken: token,
          role: user.role,
          idEmployee: user.idEmployee,
        },
        message: "Login sucessfully!",
      })
    }
  } catch (error) {
    return ({ data: null, message: "Server error!" });
  }
}

// const register = async (payload) => {
//   const { username, password, active, roleId, permissionIds } = payload;
//   if (await roleService.checkRoleExist(role)) {

//   }
// }

module.exports = {
  authenticate,
  // register,
};