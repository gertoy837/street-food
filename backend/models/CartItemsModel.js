import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Carts from "./CartsModel.js";
import MenuItems from "./MenuItemsModel.js";

const { DataTypes } = Sequelize;

const CartsItems = db.define(
  "cartItems",
  {
    cart_id: DataTypes.INTEGER,
    menu_item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

CartsItems.belongsTo(MenuItems, {
  foreignKey: 'menu_item_id',
  targetKey: 'id',
  as: 'menu',
});
CartsItems.belongsTo(Carts, {
  foreignKey: 'cart_id',
  targetKey: 'id',
  as: 'cart',
});
export default CartsItems;

(async () => {
  await db.sync();
})();
