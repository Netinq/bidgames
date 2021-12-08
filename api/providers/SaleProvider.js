const Sale = require("../../database/models/Sale");
const ErrorMessage = require("../errors/ErrorMessage");

async function Exist(uuid) {
  const sale = await Sale.findOne({ where: { sale_uuid: uuid } });
  if (sale == null) throw new ErrorMessage("Enchère introuvable");
  else return sale;
}

module.exports = {
  Exist,
};
