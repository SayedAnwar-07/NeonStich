import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    profileImage: {
      type: String,
      default:
        "https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80",
    },
    date: { type: Date, default: Date.now },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
