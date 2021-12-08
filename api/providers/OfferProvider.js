const Item = require("../../database/models/Item");
const Sell = require("../../database/models/Sell");
const MakeAnOffer = require("../../database/models/MakeAnOffer");
const ErrorMessage = require("../errors/ErrorMessage");

async function CheckOfferSell(item, sale) {
  const sell = await Sell.findOne({
    where: { item_id: item.item_id, sale_uuid: sale.sale_uuid },
  });
  if (sell == null) throw new ErrorMessage("Pas d'enchère");
  else return sell;
}

async function CheckOfferPrice(item, sell, price) {
  const offers = await MakeAnOffer.findAll({
    where: { item_id: sell.item_id, sale_uuid: sell.sale_uuid },
  });

  let min_price = item.price;

  offers.forEach((offer) => {
    min_price = offer.price > min_price ? offer.price : min_price;
  });

  if (min_price >= price)
    throw new ErrorMessage("Proposition trop basse", "price");
}

async function CheckSold(item) {
  if (item.sold) throw new ErrorMessage("Objet déjà vendu !", "price");
}

async function CheckSale(sale) {
  const now = new Date();
  if (!(sale.start_date < now && now < sale.end_date))
    throw new ErrorMessage("Ordre impossible !", "price");
}

module.exports = { CheckOfferSell, CheckOfferPrice, CheckSold, CheckSale };
