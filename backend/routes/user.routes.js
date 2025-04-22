import express from "express";
import {
  userRegister,
  userLogin,
  userProfile,
  logout,
  getAllUsers,
  adminLogin,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", userRegister);
router.post("/login", userLogin);

// Protected Routes (Require Authentication)
router.get("/profile", authMiddleware(["user", "admin"]), userProfile);
router.post("/logout", authMiddleware(["user", "admin"]), logout);

// Admin-Only Routes
router.post("/admin/login", adminLogin);
router.get("/all-users", authMiddleware(["admin"]), getAllUsers);

export default router;
