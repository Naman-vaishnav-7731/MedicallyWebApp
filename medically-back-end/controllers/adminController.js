const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../model");
const admin = db.admin;
const sequelize = require("sequelize");

// Implement Server-Side validation on login fileds
const validatelogin = require("../validation/login.admin.validation");

// Genrate The JWT Token
const genrateToken = require("../util/genrate.jwt.token");

// @dec Admin Create | @Route admin/addadmin | @Access is Disable
const addAdmin = asyncHandler(async (req, res) => {
  const { admin_name, admin_email, password , userType , id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const addAdmin = await admin.create({
      admin_email,
      admin_name,
      password: hashedPassword,
      userType,
      id
    });
    if (addAdmin) {
      res.status(200).json({ message: "successfully admin is added" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
});

// @desc Admin Login
// @Route admin/login
// @Access Only admin
const adminLogin = asyncHandler(async (req, res) => {
  // Validate login fileds
  const { errors, isValid } = validatelogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // find admin data
    const adminData = await admin.findOne({
      where: { admin_email: req.body.admin_email },
    });

    // If admin is not exits
    if (adminData === null) {
      return res
        .status(404)
        .json({ message: `${req.body.admin_email} is not exits` });
    }

    // compare user password with hashpassword
    if (
      adminData &&
      (await bcrypt.compare(req.body.password, adminData.password))
    ) {
      // genrate token
      const Token = genrateToken(adminData.id);

      res.status(200).json({
        email: adminData.admin_email,
        name: adminData.admin_name,
        Token: Token,
        Role: "Admin",
      });
    } else {
      res.status(400).json({ message: "Email and password is not match" });
      throw new Error("Email and password is not match");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = { adminLogin, addAdmin };
