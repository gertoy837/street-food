import express from "express";
import {
  deleteMenuItems,
  getMenuItems,
  getMenuItemsById,
  saveMenuItems,
  searchMenuItems,
  updateMenuItems,
} from "../controllers/MenuItemsController.js";

const router = express.Router();

router.get("/menu-items", getMenuItems);
router.get("/menu-items/:id", getMenuItemsById);
router.get("/menu-items/search/:name", searchMenuItems);
router.post("/menu-items", saveMenuItems);
router.patch("/menu-items/:id", updateMenuItems);
router.delete("/menu-items/:id", deleteMenuItems);

export default router;
