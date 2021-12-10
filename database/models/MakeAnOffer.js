const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class MakeAnOffer extends Model {}

MakeAnOffer.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
    },
    sale_uuid: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
    },
    user_uuid: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
    },
    price: DataTypes.INTEGER,
  },
  {
    sequelize: sequelize,
    modelName: "make_an_offer",
    tableName: "make_an_offer",
    timestamps: false,
  }
);

module.exports = MakeAnOffer;
