import { Sequelize } from "sequelize";

const db = new Sequelize("street-food", "phpmyadmin", "bismillah", {
  host: "localhost",
  dialect: "mysql",
  underscored: true,
});

export default db;