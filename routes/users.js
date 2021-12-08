let express = require("express");
let router = express.Router();
const { Register, Login } = require("../api/controllers/AuthController");
const AppToken = require("../api/middlewares/AppToken");

router.post(
  "/register",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res) => Register(req, res)
);

router.post(
  "/login",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res) => Login(req, res)
);

module.exports = router;
