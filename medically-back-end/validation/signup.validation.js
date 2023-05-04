const validator = require("validator");
const isEmpty = require("is-empty");

const validateSignup = (data) => {

    // According to User Type Validation
    // SignUp Type

  let errors = {};
  //TODO:Implementation Server side Validation

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.Dob = !isEmpty(data.Dob) ? data.Dob : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  // Validate fields using validator functions
  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "First name is required";
  }
  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name is required";
  }
  if (validator.isEmpty(data.phone_number)) {
    errors.phone_number = "Phone number is required";
  } else if (!validator.isMobilePhone(data.phone_number, "en-IN")) {
    errors.phone_number = "Phone number is invalid";
  }
  if (validator.isEmpty(data.gender)) {
    errors.gender = "Gender is required";
  }
  if (validator.isEmpty(data.Dob)) {
    errors.Dob = "Date of birth is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email address is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = "Confirm password is required";
  }
  if (!validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Passwords must match";
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "City is required";
  }
  if (validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zip code is required";
  }
  if (validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateSignup;
