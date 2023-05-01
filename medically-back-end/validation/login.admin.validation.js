const validator = require("validator");
const isEmpty = require("is-empty");

const validateLogin = (data) => {
  // error object contains all errors
  const errors = {};

  data.admin_email = !isEmpty(data.admin_email) ? data.admin_email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.admin_email)) {
    errors.admin_email = "Email address is required";
  } else if (!validator.isEmail(data.admin_email)) {
    errors.admin_email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLogin;
