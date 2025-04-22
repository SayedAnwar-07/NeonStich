import express from "express";
import upload from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Admin-Only Routes
router.post(
  "/add-product",
  authMiddleware(["admin"]),
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.delete(
  "/delete-product/:id",
  authMiddleware(["admin"]),
  deleteProduct
);

router.put(
  "/update-product/:id",
  authMiddleware(["admin"]), 
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);

// Public Routes (Accessible to all users)
router.get("/all-products", getAllProducts); 
router.get("/:id", getProductById); 

export default router;