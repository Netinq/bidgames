let express = require("express");
let router = express.Router();
const {
  Store,
  Show,
  Update,
  Destroy,
  AddFavorite,
  All,
} = require("../api/controllers/SalesController");
const AppToken = require("../api/middlewares/AppToken");
const UserToken = require("../api/middlewares/UserToken");
const RoleMiddleware = require("../api/middlewares/RoleMiddleware");

router.get(
  "/all",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res, next) => UserToken(req, res, next),
  async (req, res, next) => RoleMiddleware(req, res, next, 1000),
  async (req, res) => All(req, res)
);
router.post(
  "/",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res, next) => UserToken(req, res, next),
  async (req, res, next) => RoleMiddleware(req, res, next, 1000),
  async (req, res) => Store(req, res)
);
router.post(
  "/:uuid/fav",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res, next) => UserToken(req, res, next),
  async (req, res) => AddFavorite(req, res)
);
router.get(
  "/:uuid",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res, next) => UserToken(req, res, next),
  async (req, res) => Show(req, res)
);
router.post(
  "/:uuid",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res, next) => UserToken(req, res, next),
  async (req, res, next) => RoleMiddleware(req, res, next, 1000),
  async (req, res) => Update(req, res)
);
router.delete(
  "/:uuid",
  async (req, res, next) => AppToken(req, res, next),
  async (req, res, next) => UserToken(req, res, next),
  async (req, res, next) => RoleMiddleware(req, res, next, 1000),
  async (req, res) => Destroy(req, res)
);

module.exports = router;
