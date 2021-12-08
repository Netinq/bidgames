const Item = require("../../database/models/Item");
const Sale = require("../../database/models/Sale");
const Sell = require("../../database/models/Sell");
const User = require("../../database/models/User");
const Favorite = require("../../database/models/FavoriteItem");
const MakeAnOffer = require("../../database/models/MakeAnOffer");
const ErrorMessage = require("../errors/ErrorMessage");
const ErrorMessageValidator = require("../errors/ErrorMessageValidator");
const ValidatorStore = require("../validators/items/Store");
const ValidatorUpdate = require("../validators/items/Update");
const ValidatorMakeAnOffer = require("../validators/items/MakeAnOffer");

const ItemProvider = require("../providers/ItemProvider");
const SaleProvider = require("../providers/SaleProvider");

const {
  CheckOfferSell,
  CheckOfferPrice,
  CheckSold,
  CheckSale,
} = require("../providers/OfferProvider");

async function Store(req, res) {
  const { error } = ValidatorStore.validate(req.body);
  if (error) return new ErrorMessageValidator(error).send(res);

  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    virtual: req.body.virtual,
    min_age: req.body.min_age,
    price: req.body.price,
    need_estime: req.body.need_estime,
    user_uuid: req.user.user_uuid,
  });

  console.log(item);

  await item.save();

  return res.json({
    success: "Item créé avec succès !",
  });
}
async function Update(req, res) {
  const { error } = ValidatorUpdate.validate(req.body);
  if (error) return new ErrorMessageValidator(error).send(res);

  const item = await ItemProvider.Exist(req.params.id).catch((error) =>
    error.send(res)
  );

  if (req.body.name) item.name = req.body.name;
  if (req.body.description) item.description = req.body.description;
  if (req.body.virtual) item.virtual = req.body.virtual;
  if (req.body.min_age) item.min_age = req.body.min_age;
  if (req.body.price) item.price = req.body.price;
  if (req.body.sold) item.sold = req.body.sold;
  if (req.body.sold_at) item.sold_at = req.body.sold_at;
  if (req.body.need_estime) item.need_estime = req.body.need_estime;
  if (req.body.user_uuid) item.user_uuid = req.body.user_uuid;

  await item.save();

  return res.json({
    success: "Item mise à jour !",
  });
}
async function Destroy(req, res) {
  const item = await Item.findOne({ where: { item_id: req.params.id } });
  if (item == null) return new ErrorMessage("Objet introuvable").send(res);

  await item.destroy();

  return res.json({ success: "Enchère supprimé !" });
}

async function Show(req, res) {
  const item = await ItemProvider.Exist(req.params.id).catch((error) =>
    error.send(res)
  );
  const user = await User.findOne({ where: { user_uuid: item.user_uuid } });

  return res.json({ item: item, owner: user });
}

async function SellItem(req, res) {
  await ItemProvider.Exist(req.body.item_id).catch((error) => error.send(res));
  await SaleProvider.Exist(req.body.sale_uuid).catch((error) =>
    error.send(res)
  );

  let sell = await Sell.findOne({
    where: { item_id: req.body.item_id, sale_uuid: req.body.sale_uuid },
  });
  if (sell) return new ErrorMessage("Objet déjà lié à cette enchère").send(res);

  sell = new Sell({
    item_id: req.body.item_id,
    sale_uuid: req.body.sale_uuid,
  });

  await sell.save();

  return res.json({
    success: "Item lié à une enchère",
  });
}

async function MakeOffer(req, res) {
  const { error } = ValidatorMakeAnOffer.validate(req.body);
  if (error) return new ErrorMessageValidator(error).send(res);

  const item = await ItemProvider.Exist(req.body.item_id).catch((error) =>
    error.send(res)
  );

  const sale = await SaleProvider.Exist(req.body.sale_uuid).catch((error) =>
    error.send(res)
  );

  try {
    await CheckSold(item);
    await CheckSale(sale);
    const sell = await CheckOfferSell(item, sale);
    await CheckOfferPrice(item, sell, req.body.price);
  } catch (error) {
    error.send(res);
    return;
  }

  const offer = new MakeAnOffer({
    item_id: item.item_id,
    sale_uuid: sale.sale_uuid,
    user_uuid: req.user.user_uuid,
    price: req.body.price,
  });

  await offer.save();

  return res.json({
    success: "Ordre d'achat posé !",
  });
}

async function AddFavorite(req, res) {
  const item = await ItemProvider.Exist(req.params.id).catch((error) =>
    error.send(res)
  );

  if (
    await Favorite.findOne({
      where: { item_id: item.item_id, user_uuid: req.user.user_uuid },
    })
  )
    return new ErrorMessage("Déjà en favoris").send(res);

  const favorite = new Favorite({
    item_id: item.item_id,
    user_uuid: req.user.user_uuid,
  });

  await favorite.save();

  return res.json({
    success: "Ajouté au(x) favori(s) !",
  });
}

async function All(req, res) {
  const items = await Item.findAll({ attributes: { exclude: ["user_uuid"] } });
  res.json(items);
}

module.exports = {
  Store,
  Update,
  Destroy,
  Show,
  SellItem,
  MakeOffer,
  AddFavorite,
  All,
};
