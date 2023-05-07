// Verify the token
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require("../model");
const user = db.user;
const admin = db.admin;

const authMiddleware = asyncHandler(async (req, res, next) => {
  let Token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token for headers
      Token = req.headers.authorization.split(" ")[1];
      console.log({ Token });

      // verfiy the toke
      const decode = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
      const userInfo = await user.findOne({ where: { id: decode.id } });
      const adminInfo = await admin.findOne({ where: { id: decode.id } });


      if (userInfo && userInfo.userType == "Doctor") {
        req.userType = userInfo.userType;
        next();
      } else if (userInfo && userInfo.userType == "Patient") {
        req.userType = userInfo.userType;
        next();
      } else if (adminInfo && adminInfo.userType == "Admin") {
        req.userType = adminInfo.userType;
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Authentication failed: invalid token" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
  if (!Token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: no token provided" });
  }
});

module.exports = authMiddleware;