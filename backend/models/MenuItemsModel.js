import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Restaurant from "./RestaurantsModel.js";
import Categories from "./CategoriesModel.js";

const { DataTypes } = Sequelize;

const MenuItems = db.define(
  "menuItems",
  {
    name: DataTypes.STRING,
    rating: DataTypes.DECIMAL(2,1),
    price: DataTypes.DECIMAL(10,2),
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    restaurant_id: DataTypes.INTEGER,
    categori_id: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

MenuItems.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  targetKey: 'id',
  as: 'restaurant',
});
// Restaurant.hasMany(MenuItems);
// MenuItems.belongsTo(Restaurant, { foreignKey: "restaurant_id" });
// Categories.hasMany(MenuItems);
// MenuItems.belongsTo(Categories, { foreignKey: "categori_id" });
export default MenuItems;

(async () => {
  await db.sync();
})();
