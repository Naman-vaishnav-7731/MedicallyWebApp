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
            city: { [Op.like]: `%${search}%` },
          },
          {
            pincode: { [Op.like]: `%${search}%` },
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
  // Logic to update a user in the database based on their email address
});

// @desc Delete user
// @route DELETE /deleteUser/:email
// @access Private
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = { addUser, getUsers, getUser, updateUser, deleteUser };
