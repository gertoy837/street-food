import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import CartItemRoute from "./routes/CartItemRoute.js";
import CartsRoute from "./routes/CartsRoute.js";
import CategoriesRoute from "./routes/CategoriesRoute.js";
import MenuItemsRoute from "./routes/MenuItemsRoute.js";
import RestaurantsRoute from "./routes/RestaurantsRoute.js";
import UsersRoute from "./routes/UsersRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(CartItemRoute);
app.use(CartsRoute);
app.use(CategoriesRoute);
app.use(MenuItemsRoute);
app.use(RestaurantsRoute);
app.use(UsersRoute);

app.listen(5000, () => console.log("Server up Running..."));
