import Product from "../models/products.model.js";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../config/cloudinaryConfig.js";

// Connect to Cloudinary
connectCloudinary();

// Add products by admin
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      bestseller,
      sizes,
      subCategory,
    } = req.body;

    const images = [
      req.files.image1 && req.files.image1[0],
      req.files.image2 && req.files.image2[0],
      req.files.image3 && req.files.image3[0],
      req.files.image4 && req.files.image4[0],
    ].filter((item) => item !== undefined);

    const imageURLs = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const newProduct = new Product({
      name,
      description,
      price: Number(price),
      category,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      subCategory,
      image: imageURLs,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: `${name} added successfully` });
  } catch (err) {
    console.error("Error in addProduct:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete products by admin
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await Promise.all(
      product.image.map(async (imageUrl) => {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      })
    );

    res
      .status(200)
      .json({ success: true, message: `${product.name} is deleted` });
  } catch (err) {
    console.error("Error in deleteProduct:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update products by admin
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      bestseller,
      sizes,
      subCategory,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.bestseller = bestseller
      ? bestseller === "true"
      : product.bestseller;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.subCategory = subCategory || product.subCategory;

    if (req.files) {
      const images = [
        req.files.image1 && req.files.image1[0],
        req.files.image2 && req.files.image2[0],
        req.files.image3 && req.files.image3[0],
        req.files.image4 && req.files.image4[0],
      ].filter((item) => item !== undefined);

      const imageURLs = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );

      await Promise.all(
        product.image.map(async (imageUrl) => {
          const publicId = imageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        })
      );

      product.image = imageURLs;
    }

    await product.save();
    res
      .status(200)
      .json({ success: true, message: `${name} updated successfully` });
  } catch (err) {
    console.error("Error in updateProduct:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("Error in getAllProducts:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error("Error in getProductById:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
