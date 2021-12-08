const Item = require("../../database/models/Item");
const ErrorMessage = require("../errors/ErrorMessage");

async function Exist(id) {
  const item = await Item.findOne({ where: { item_id: id } });
  if (item == null) throw new ErrorMessage("Objet introuvable");
  else return item;
}

module.exports = {
  Exist,
};
