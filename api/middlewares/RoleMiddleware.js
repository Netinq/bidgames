const JWT = require("jsonwebtoken");
const ErrorMessage = require("../errors/ErrorMessage");

module.exports = async (req, res, next, access) => {
  const token = req.header("user-token");
  JWT.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    if (decode.data.access_level < access)
      return new ErrorMessage("Cannot access").send(res);
    next();
  });
};
