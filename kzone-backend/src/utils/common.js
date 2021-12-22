const jwt = require("jsonwebtoken");

const validateAuthInput = ({ username, password, ...payload }) => {
  let errors = {};
  if (username.trim() == "") {
    errors.username = "Username must be not empty!";
  }
  // else if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
  //   errors.username = "Username is not valid formart!"
  // }
  if (password.trim() == "") {
    errors.password = "Password must be not empty!";
  }
  // else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
  //   errors.password = "Password is not valid format!";
  // }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

const validateProfileInput = ({ name, dob, email, address, phone, identifyNumber, type }) => {
  let errors = {};
  if (name.trim() == "") errors.name = "Name must be not empty!";
  if (dob.trim() == "") errors.dob = "Date of birth must be not empty!";
  if (email.trim() == "") errors.email = "Email must be not empty!";
  else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    errors.email = "Email is not valid format!";
  }
  if (address.trim() == "") errors.dob = "Address must be not empty!";
  if (phone.trim() == "") errors.email = "Phone must be not empty!";
  if (type == 2) {
    if (identifyNumber.trim() == "") errors.email = "Identify number must be not empty!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

const generateToken = ({ id, username, email }) => jwt.sign({
  id, email, username,
}, process.env.SECRET_KEY, { expiresIn: "24h" });

const createResponse = (code, data, message) => ({
  code, data, message,
})

const createErrorMessage = (field, code) => {
  switch (code) {
    case 0: return `${field} must be not empty!`;
    case 1: return `${field} must be positive!`;
    default: return null;
  }
}

const validateEmptyInput = (payload) => {
  let errors = {};
  for (const key in payload) {
    if (Object.hasOwnProperty.call(payload, key)) {
      const element = payload[key];
      if (element === undefined || element === null || element === "") {
        errors[key] = createErrorMessage(key, 0);
      }
    }
  }
  return {
    valid: Object.keys(errors).length <= 0,
    errors,
  }
}

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = Math.max(0, page - 1) ? Math.max(0, page - 1) * limit : 0;

  return { limit, offset };
};

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

module.exports = {
  validateAuthInput,
  validateProfileInput,
  createResponse,
  generateToken,
  createErrorMessage,
  validateEmptyInput,
  getPagination,
  removeVietnameseTones,
}