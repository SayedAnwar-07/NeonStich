import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";

const Orders = () => {
  const { cartItem, products, currency, delivery_fee } =
    useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (let itemId in cartItem) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        for (let size in cartItem[itemId]) {
          subtotal += product.price * cartItem[itemId][size];
        }
      }
    }
    return subtotal;
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = delivery_fee;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    console.log("Order placed with method:", method);
    console.log("Form Data:", formData);
    toast.success("Order placed successfully!");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 justify-between pt-10 px-4 sm:px-8">
      {/* Customer Information Form */}
      <div className="w-full">
        <div className="text-2xl">
          <Title text1={"CUSTOMER"} text2={"INFORMATION FORM"} />
        </div>
        <form className="sm:w-3/4 mt-4">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Last Name"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-6"
            placeholder="Email Address"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-6"
            placeholder="Full Address"
          />
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Zip Code"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="City Name"
            />
          </div>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-6"
            placeholder="Phone Number"
          />
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full sm:w-3/4">
        <div className="text-2xl">
          <Title text1={"CART"} text2={"TOTAL"} />
        </div>
        <div className="bg-white p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Subtotal:</span>
            <span className="text-lg font-medium">
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>
          <hr className="my-4 border-gray-200" />

          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-medium">Delivery Fee:</span>
            <span className="text-lg font-medium">
              {currency}
              {deliveryFee.toFixed(2)}
            </span>
          </div>
          <hr className="my-4 border-gray-200" />

          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">
              {currency}
              {total.toFixed(2)}
            </span>
          </div>
          <hr className="my-4 border-gray-200" />

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border py-3 px-6 cursor-pointer ${
                  method === "stripe"
                    ? "border-primary bg-opacity-10"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    method === "stripe"
                      ? "border-primary bg-primary"
                      : "border-gray-400"
                  }`}
                >
                  {method === "stripe" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
              </div>
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border px-6 py-3 cursor-pointer ${
                  method === "razorpay"
                    ? "border-primary bg-opacity-10"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    method === "razorpay"
                      ? "border-primary bg-primary"
                      : "border-gray-400"
                  }`}
                >
                  {method === "razorpay" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <img
                  src={assets.razorpay_logo}
                  className="h-5"
                  alt="Razorpay"
                />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border px-6 py-3 cursor-pointer ${
                  method === "cod"
                    ? "border-primary bg-opacity-10"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    method === "cod"
                      ? "border-primary bg-primary"
                      : "border-gray-400"
                  }`}
                >
                  {method === "cod" && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span>Cash On Delivery</span>
              </div>
            </div>
          </div>

          <Link to="/order-status">
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-black text-white py-3 font-semibold hover:bg-black/85 transition duration-300 ease-in cursor-pointer"
            >
              Confirm Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
