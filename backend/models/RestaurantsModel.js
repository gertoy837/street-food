import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Restaurant = db.define(
  "restaurants",
  {
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    city: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

export default Restaurant;

(async () => {
  await db.sync();
})();
