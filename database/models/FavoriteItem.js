const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class FavoriteItem extends Model {}

FavoriteItem.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
    },
    user_uuid: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
    },
  },
  {
    sequelize: sequelize,
    modelName: "Favorite_Item",
    timestamps: false,
  }
);

module.exports = FavoriteItem;
