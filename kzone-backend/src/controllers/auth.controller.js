const { authService } = require("../services");
const { createResponse, validateAuthInput } = require("../utils/common");

/**[POST] */

//login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { errors, valid } = validateAuthInput({ username, password });
    if (!valid) {
      return res.status(422).json(createResponse(0, {}, errors));
    }
    let { data, message } = await authService.authenticate({ username, password });
    if (!data) {
      return res.status(401).json(createResponse(0, {}, message));
    }
    else {
      return res.status(200).json(createResponse(1, data, message));
    }
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Something went wrong, please try again later!"));
  }
}

//logout
const logout = (req, res, next) => {
  try {
    return res.status(200).json(createResponse(1, {}, "Logout successfully!"));
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

//register
const register = (req, res, next) => {
  try {
    const { username, password, active, role, roles } = req.params;
    const auth = authService.register({ username, password, active, role, roles });
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  login,
  logout,
}