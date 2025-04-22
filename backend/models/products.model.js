import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: Array,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
