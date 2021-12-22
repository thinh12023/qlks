const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { ROLE_ADMIN } = require("../constants");

const checkValidToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY || "jpeace08", (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({
          code: 0,
          data: {},
          message: "Token is not valid",
        })
      }
      req.authInfo = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
}

const checkRoleAdmin = async (req, res, next) => {
  try {
    if (req.authInfo) {
      const { id } = req.authInfo;
      const user = await User.findOne({ where: { id } });
      if (user && user.role == ROLE_ADMIN) {
        next();
      }
      else return res.sendStatus(403);
    }
    else return res.sendStatus(401);
  } catch (error) {
    return res.status(500).json(createResponse(0, {}, "Somethings went wrong, please try again later"));;
  }
}

module.exports = {
  checkValidToken,
  checkRoleAdmin,
}