import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// Public Routes
router.post("/add-cart", authMiddleware(["user", "admin"]), addToCart);
router.post("/update-cart", authMiddleware(["user", "admin"]), updateCart);
router.get("/user-cart", authMiddleware(["user", "admin"]), getUserCart);
router.post("/remove-cart", authMiddleware(["user", "admin"]), removeFromCart);

export default router;
