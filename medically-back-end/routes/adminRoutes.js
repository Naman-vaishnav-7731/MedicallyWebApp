const express = require("express");
const Router = express.Router();
const { adminLogin, addAdmin } = require("../controllers/adminController");

// Implement admin login Route
Router.route("/login").post(adminLogin);

// Implement Add  Admin
Router.route("/addadmin").post(addAdmin);

module.exports = Router;
