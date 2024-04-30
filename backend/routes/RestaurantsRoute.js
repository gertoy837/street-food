import express from "express";
import {
  deleteRestaurants,
  getRestaurants,
  getRestaurantsById,
  saveRestaurants,
  updateRestaurants,
} from "../controllers/RestaurantsController.js";

const router = express.Router();

router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurantsById);
router.post("/restaurants", saveRestaurants);
router.patch("/restaurants/:id", updateRestaurants);
router.delete("/restaurants/:id", deleteRestaurants);

export default router;
