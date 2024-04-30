import { Sequelize } from "sequelize";

const db = new Sequelize("upload_db", "phpmyadmin", "bismillah", {
  host: "localhost",
  dialect: "mysql",
  underscored: true,
});

export default db;