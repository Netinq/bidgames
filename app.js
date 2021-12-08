const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./database/connexion");
var cors = require("cors");

const app = express();

sequelize.sync();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/users"));
app.use("/sales", require("./routes/sales"));
app.use("/items", require("./routes/items"));

module.exports = app;
