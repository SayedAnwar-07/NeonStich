import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinaryConfig.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRouter from "./routes/order.route.js";

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
      process.env.FRONTEND_LOCAL_URL,
      process.env.ADMIN_LOCAL_URL,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
connectCloudinary();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Clothing MERN App!");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
