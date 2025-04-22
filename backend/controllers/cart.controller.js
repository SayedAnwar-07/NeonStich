import userModel from "../models/user.model.js";
import productModel from "../models/products.model.js";

const initializeCartData = async (user) => {
  if (user.cartData === null || user.cartData === undefined) {
    user.cartData = {};
    await user.save();
  }
  return user;
};

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cartData) {
      user.cartData = {};
    }

    if (!user.cartData[itemId]) {
      user.cartData[itemId] = {};
    }
    user.cartData[itemId][size] = (user.cartData[itemId][size] || 0) + 1;

    await userModel.updateOne({ _id: userId }, { cartData: user.cartData });
    const product = await productModel.findById(itemId);

    res.status(200).json({
      success: true,
      message: `${product?.name.slice(0, 15)}... added to cart`,
      cartData: user.cartData,
    });
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Get user cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.cartData) {
      user.cartData = {};
      await user.save();
    }

    res.status(200).json({
      success: true,
      cartData: user.cartData,
    });
  } catch (err) {
    console.error("Error in getUserCart:", err);
    res.status(500).json({ success: false, message: "Failed to get cart" });
  }
};

// Update cart item quantity
export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.user.userId;

    if (!itemId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Item ID, size and quantity are required",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cartData?.[itemId]?.[size]) {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (quantity > 0) {
      user.cartData[itemId][size] = quantity;
    } else {
      delete user.cartData[itemId][size];

      if (Object.keys(user.cartData[itemId]).length === 0) {
        delete user.cartData[itemId];
      }
    }

    user.markModified("cartData");
    await user.save();

    const product = await productModel.findById(itemId);

    return res.status(200).json({
      success: true,
      message: `${product?.name} quantity updated`,
      cartData: user.cartData,
    });
  } catch (err) {
    console.error("Error in updateCart:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;

    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("User cart before removal:", user.cartData);

    if (
      !user.cartData ||
      !user.cartData[itemId] ||
      !user.cartData[itemId][size]
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    const product = await productModel.findById(itemId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    delete user.cartData[itemId][size];

    if (Object.keys(user.cartData[itemId]).length === 0) {
      delete user.cartData[itemId];
    }

    console.log("User cart after removal:", user.cartData);

    user.markModified("cartData");
    await user.save();

    res.status(200).json({
      success: true,
      message: `${product?.name} removed`,
      cartData: user.cartData,
      productName: product.name,
    });
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    res.status(500).json({
      success: false,
      message: "Failed to remove from cart",
      error: err.message,
    });
  }
};
