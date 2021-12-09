const ErrorMessage = require("../errors/ErrorMessage");

module.exports = async (req, res, next) => {
  const token = req.header("app-token");
  if (token != process.env.TOKEN)
    return new ErrorMessage("Invalid token").send(res);
  next();
};
