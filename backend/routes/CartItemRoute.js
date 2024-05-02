import express from "express";
import {
  deleteAllCartItems,
  deleteCartItems,
  getCartItems,
  getCartItemsById,
  saveCartItems,
  updateCartItems,
} from "../controllers/CartItemsController.js";

const router = express.Router();

router.get("/cart-item", getCartItems);
router.get("/cart-item/:id", getCartItemsById);
router.post("/cart-item", saveCartItems);
router.put("/cart-item/:id", updateCartItems);
router.delete("/cart-item/:id", deleteCartItems);
router.delete("/cart-items/all", deleteAllCartItems);

export default router;
