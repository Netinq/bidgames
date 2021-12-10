const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class Item extends Model {}

Item.init(
  {
    item_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    isvirtual: DataTypes.BOOLEAN,
    min_age: DataTypes.SMALLINT,
    price: DataTypes.INTEGER,
    sold: DataTypes.BOOLEAN,
    sold_at: DataTypes.DATE,
    need_estime: DataTypes.BOOLEAN,
    depot_id: DataTypes.INTEGER,
    user_uuid: DataTypes.CHAR(36),
  },
  {
    sequelize: sequelize,
    modelName: "Item",
    timestamps: false,
  }
);

module.exports = Item;
