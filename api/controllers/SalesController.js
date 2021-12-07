const Sale = require("../../database/models/Sale");
const User = require("../../database/models/User");
const ErrorMessage = require("../errors/ErrorMessage");
const ErrorMessageValidator = require("../errors/ErrorMessageValidator");
const ValidatorStore = require("../validators/sales/Store");
const ValidatorUpdate = require("../validators/sales/Update");

async function Store(req, res) {
  const { error } = ValidatorStore.validate(req.body);
  if (error) return new ErrorMessageValidator(error).send(res);

  const user = await User.findOne({ where: { user_uuid: req.body.user_uuid } });
  if (user == null)
    return new ErrorMessage("Utilisateur inconnu", "user_uuid").send(res);

  const sale = new Sale({
    flash: req.body.flash,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    user_uuid: req.body.user_uuid,
  });

  await sale.save();

  return res.json({
    success: "Enchère créé avec succès !",
  });
}
async function Update(req, res) {
  const { error } = ValidatorUpdate.validate(req.body);
  if (error) return new ErrorMessageValidator(error).send(res);

  const sale = await Sale.findOne({ where: { sale_uuid: req.params.uuid } });
  if (sale == null) return new ErrorMessage("Objet introuvable").send(res);

  if (req.body.user_uuid) {
    const user = await User.findOne({
      where: { user_uuid: req.body.user_uuid },
    });
    if (user == null)
      return new ErrorMessage("Utilisateur inconnu", "user_uuid").send(res);
  }

  if (req.body.flash) sale.flash = req.body.flash;
  if (req.body.start_date) sale.start_date = req.body.start_date;
  if (req.body.end_date) sale.end_date = req.body.end_date;
  if (req.body.user_uuid) sale.user_uuid = req.body.user_uuid;

  await sale.save();

  return res.json({
    success: "Enchère mise à jour !",
  });
}
async function Destroy(req, res) {
  const sale = await Sale.findOne({ where: { sale_uuid: req.params.uuid } });
  if (sale == null) return new ErrorMessage("Objet introuvable").send(res);

  await sale.destroy();

  return res.json({ success: "Enchère supprimé !" });
}

async function Show(req, res) {
  const sale = await Sale.findOne({ where: { sale_uuid: req.params.uuid } });
  if (sale == null) return new ErrorMessage("Objet introuvable").send(res);

  const user = await User.findOne({ where: { user_uuid: sale.user_uuid } });

  return res.json({ sale: sale, auctioneer: user });
}

module.exports = {
  Store,
  Update,
  Destroy,
  Show,
};
