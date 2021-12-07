const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./database/connexion");

const app = express();

sequelize.sync();
dotenv.config();

app.use(express.json());
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/users"));
app.use("/sales", require("./routes/sales"));

module.exports = app;
