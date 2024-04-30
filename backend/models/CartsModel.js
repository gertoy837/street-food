import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Restaurant from "./RestaurantsModel.js";

const { DataTypes } = Sequelize;

const Carts = db.define(
  "carts",
  {
    user_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

Carts.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id', // atribut foreign key pada model carts
  targetKey: 'id',
  as: 'restaurant', // alias untuk akses hubungan
});
export default Carts;

(async () => {
  await db.sync();
})();
