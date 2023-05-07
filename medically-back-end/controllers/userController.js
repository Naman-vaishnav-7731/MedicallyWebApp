const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../model");
const user = db.user;
const sequelize = require("sequelize");
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/helper");

// Genrate The JWT Token
const genrateToken = require("../util/genrate.jwt.token");

// @desc Add user
// @route POST /adduser
// @access Public
const addUser = asyncHandler(async (req, res) => {
  const file = req.file?.filename;
  const { userType, signupType } = req.body;
  console.log(userType);

  // Check Which SignUp Method Use User
  if (signupType == "googleSignup") {
    if (userType == "Doctor") {
      const {
        firstname,
        lastname,
        phone_number,
        gender,
        Dob,
        email,
        qualification,
        specialization,
        city,
        zipcode,
        address,
      } = req.body;

      // check Email is already exits or not
      const emailExits = await user.findOne({ where: { email: email } });
      if (emailExits) {
        return res.status(400).json({ message: "Email is already Exits" });
      }

      // Doctor Modal
      const doctor = await user.create({
        firstname,
        lastname,
        email,
        phone_number,
        gender,
        Dob,
        qualification,
        specialization,
        city,
        zipcode,
        address,
        userType,
        isApproved: false,
        image: file,
      });

      if (doctor) {
        res.status(201).json({
          id: doctor.id,
          email: doctor.email,
          userType: doctor.userType,
        });
      } else {
        res.status(400).json({ message: "User Data is not valid" });
        throw new Error("user data is not valid");
      }
    } else {
      const {
        firstname,
        lastname,
        phone_number,
        gender,
        Dob,
        email,
        city,
        zipcode,
        address,
      } = req.body;

      // check Email is already exits or not
      const emailExits = await user.findOne({ where: { email: email } });
      if (emailExits) {
        return res.status(400).json({ message: "Email is already Exits" });
      }

      // patient Modal
      const patient = await user.create({
        firstname,
        lastname,
        email,
        phone_number,
        gender,
        Dob,
        city,
        zipcode,
        address,
        userType,
        isApproved: false,
        image: file,
      });

      if (patient) {
        res.status(201).json({
          id: patient.id,
          email: patient.email,
          userType: patient.userType,
        });
      } else {
        res.status(400).json({ message: "User Data is not valid" });
        throw new Error("user data is not valid");
      }
    }
  } else {
    if (userType == "Doctor") {
      const {
        firstname,
        lastname,
        phone_number,
        gender,
        Dob,
        password,
        email,
        qualification,
        specialization,
        city,
        zipcode,
        address,
      } = req.body;

      // check Email is already exits or not
      const emailExits = await user.findOne({ where: { email: email } });
      if (emailExits) {
        return res.status(400).json({ message: "Email is already Exits" });
      }

      // hash password for security purposes
      const hashedPassword = await bcrypt.hash(password, 10);

      // Doctor Modal
      const doctor = await user.create({
        firstname,
        lastname,
        email,
        phone_number,
        gender,
        Dob,
        password: hashedPassword,
        qualification,
        specialization,
        city,
        zipcode,
        address,
        userType,
        isApproved: false,
        image: file,
      });

      if (doctor) {
        res.status(201).json({
          id: doctor.id,
          email: doctor.email,
          userType: doctor.userType,
        });
      } else {
        res.status(400).json({ message: "User Data is not valid" });
        throw new Error("user data is not valid");
      }
    } else {
      const {
        firstname,
        lastname,
        phone_number,
        gender,
        Dob,
        email,
        city,
        password,
        zipcode,
        address,
      } = req.body;

      // check Email is already exits or not
      const emailExits = await user.findOne({ where: { email: email } });
      if (emailExits) {
        return res.status(400).json({ message: "Email is already Exits" });
      }

      // hash password for security purposes
      const hashedPassword = await bcrypt.hash(password, 10);

      // patient Modal
      const patient = await user.create({
        firstname,
        lastname,
        email,
        phone_number,
        password: hashedPassword,
        gender,
        Dob,
        city,
        zipcode,
        address,
        userType,
        isApproved: false,
        image: file,
      });

      if (patient) {
        res.status(201).json({
          id: patient.id,
          email: patient.email,
          userType: patient.userType,
        });
      } else {
        res.status(400).json({ message: "User Data is not valid" });
        throw new Error("user data is not valid");
      }
    }
  }
});

// @desc Get all users
// @route GET /getUsers
// @access Private
//TODO:Think about  more depth
const getUsers = asyncHandler(async (req, res) => {
  // if (!(req.userType == "Admin")) {
  //   return res
  //     .status(403)
  //     .json({ message: "Access denied: only admins can access admin data" });
  // }

  const { search, page, size } = req.query;
  // user search something
  const serachUser = search
    ? {
        [Op.or]: [
          {
            firstname: { [Op.like]: `%${search}%` },
          },
          {
            lastname: { [Op.like]: `%${search}%` },
          },
          {
            email: { [Op.like]: `%${search}%` },
          },
          {
            phone_number: { [Op.like]: `%${search}%` },
          },
          {
            isApproved: { [Op.like]: `%${search}%` },
          },
        ],
      }
    : null;

  // set limit and size
  const { limit, offset } = getPagination(Number(page), Number(size));

  //Serach user data
  try {
    const data = await user.findAndCountAll({
      where: serachUser,
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, Number(page), limit);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "some errors occurred while retrieving users" });
  }
});

// @desc Get a single user
// @route GET /getUser/:email
// @access Priavte
const getUser = asyncHandler(async (req, res) => {
  // if (
  //   !(req.userType == "Admin") ||
  //   !(req.userType == "Doctor") ||
  //   !(req.userType == "Patient")
  // ) {
  //   return res.status(403).json({ message: "Access denied: Unauthorized" });
  // }
  const { email } = req.params;
  try {
    const userExits = await user.findOne({ where: { email } });
    if (!userExits) {
      return res.status(404).json({ message: "Email is Not Found" });
    }
    res.status(200).json(userExits);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// @desc Update user
// @route PUT /updateUser/:email
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  if (
    !(req.userType == "Admin") ||
    !(req.userType == "Doctor") ||
    !(req.userType == "Patient")
  ) {
    return res.status(403).json({ message: "Access denied: Unauthorized" });
  }
});

// @desc Delete user
// @route DELETE /deleteUser/:email
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  if (!(req.userType == "Admin")) {
    return res
      .status(403)
      .json({ message: "Access denied: only admins can access admin data" });
  }
});

// @desc login user
// @route DELETE /loginUser
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, signinType, password } = req.body;

  if (signinType == "googleSignin") {
    try {
      const userData = await user.findOne({
        where: { email: email },
      });

      if (userData === null) {
        return res.status(404).json({ message: `${email} is not exits` });
      }

      if (userData) {
        const Token = genrateToken(userData.id);
        res.status(200).json({
          email: userData.email,
          Image: userData.image,
          Token: Token,
          Role: userData.userType,
        });
      } else {
        res.status(400).json({ message: "Invalid Email" });
        throw new Error("Invalid Email");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  } else {
    try {
      // find admin data
      const userData = await user.findOne({
        where: { email: email },
      });

      // If admin is not exits
      if (userData === null) {
        return res.status(404).json({ message: `${email} is not exits` });
      }

      // compare user password with hashpassword
      if (userData && (await bcrypt.compare(password, userData.password))) {
        // genrate token
        const Token = genrateToken(userData.id);

        res.status(200).json({
          email: userData.email,
          Image: userData.image,
          Token: Token,
          Role: userData.userType,
        });
      } else {
        res.status(400).json({ message: "Email and password is not match" });
        throw new Error("Email and password is not match");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
});

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
};
