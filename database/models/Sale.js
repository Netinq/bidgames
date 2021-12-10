const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connexion");

class Sale extends Model {}

Sale.init(
  {
    sale_uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require("sequelize").UUIDV4,
    },
    flash: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    user_uuid: DataTypes.CHAR(36),
  },
  {
    sequelize: sequelize,
    modelName: "sale",
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

module.exports = Sale;
