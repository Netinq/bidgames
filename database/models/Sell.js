const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class Sell extends Model {}

Sell.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
    },
    sale_uuid: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
    },
  },
  {
    sequelize: sequelize,
    modelName: "sell",
    tableName: "sell",
    timestamps: false,
  }
);

module.exports = Sell;
