import express from "express";
import {
  deleteCategories,
  getCategories,
  getCategoriesById,
  saveCategories,
  updateCategories,
} from "../controllers/CategoriesController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoriesById);
router.post("/categories", saveCategories);
router.put("/categories/:id", updateCategories);
router.delete("/categories/:id", deleteCategories);

export default router;
