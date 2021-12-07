const ErrorMessage = require("../errors/ErrorMessage");

module.exports = async (req, res, next) => {
  const token = req.header("app-token");
  if (token != process.env.TOKEN)
    throw new ErrorMessage("Invalid token").send(res);
  next();
};
