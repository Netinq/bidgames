let express = require("express");
let router = express.Router();
const { Register } = require("../api/controllers/AuthController");
const AppToken = require("../api/middlewares/AppToken");
const UserToken = require("../api/middlewares/UserToken");

router.get(
  "/",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res, next) => UserToken(req, res, next),
  function (req, res) {
    res.json(req.user);
  }
);

module.exports = router;
