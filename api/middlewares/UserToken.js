const JWT = require("jsonwebtoken");
const ErrorMessage = require("../errors/ErrorMessage");
const { RefreshToken } = require("../controllers/AuthController");

module.exports = async (req, res, next) => {
  const token = req.header("user-token");
  JWT.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    if (err) return new ErrorMessage("Cannot access").send(res);
    if (
      decode.exp >= Math.floor(Date.now() / 1000) &&
      decode.exp <
        Math.floor(Date.now() / 1000) + 60 * process.env.TOKEN_REFRESH
    ) {
      RefreshToken(req, res);
    }
    req.user = decode.data;
    next();
  });
};
