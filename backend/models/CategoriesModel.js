import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Categories = db.define(
  "categories",
  {
    name: DataTypes.STRING,
    categories: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

export default Categories;

(async () => {
  await db.sync();
})();
