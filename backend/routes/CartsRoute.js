import express from "express";
import {
  deleteCarts,
  getCarts,
  getCartsById,
  saveCarts,
  updateCarts,
} from "../controllers/CartsController.js";

const router = express.Router();

router.get("/carts", getCarts);
router.get("/carts/:id", getCartsById);
router.post("/carts", saveCarts);
router.put("/carts/:id", updateCarts);
router.delete("/carts/:id", deleteCarts);

export default router;
