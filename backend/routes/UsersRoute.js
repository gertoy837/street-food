import express from "express";
import {
  deleteUsers,
  getUsers,
  getUsersById,
  saveUsers,
  updateUsers,
} from "../controllers/UsersController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUsersById);
router.post("/users", saveUsers);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);

export default router;
