const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv").config();
const app = express();
const cors = require("cors");
require("./model/index");

const Port = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

// parse the request body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// @Route (/admin) is common route
app.use("/admin", require("./routes/adminRoutes"));

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
