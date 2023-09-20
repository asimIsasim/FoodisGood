const express = require("express");
const app = express();
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use("/Image", express.static("Image"));

const PORT = process.env.PORT;
require("./db/connect");
const Menu = require("./model/menuModel");

app.use(express.json());

app.use(require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
