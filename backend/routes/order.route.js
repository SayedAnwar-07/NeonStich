import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware(["user", "admin"]), placeOrder);
orderRouter.get("/my-orders", authMiddleware(["user", "admin"]), getUserOrders);

// admin
orderRouter.get("/all", authMiddleware(["admin"]), getAllOrders);
orderRouter.patch("/status/:orderId", authMiddleware(["admin"]), updateOrderStatus);

export default orderRouter;
