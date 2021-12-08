const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class FavoriteSale extends Model {}

FavoriteSale.init(
  {
    sale_uuid: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
    },
    user_uuid: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
    },
  },
  {
    sequelize: sequelize,
    modelName: "Favorite_Sale",
    timestamps: false,
  }
);

module.exports = FavoriteSale;
