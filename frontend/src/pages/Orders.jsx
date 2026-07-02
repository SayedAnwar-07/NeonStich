import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";

const Orders = () => {
  const { cartItem, products, currency, delivery_fee } =
    useContext(ShopContext);
  const { placeOrder, orderLoading } = useContext(OrderContext);

  const navigate = useNavigate();

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getOrderItems = () => {
    const orderItems = [];

    for (let itemId in cartItem) {
      const product = products.find((p) => p._id === itemId);

      if (product) {
        for (let size in cartItem[itemId]) {
          const quantity = cartItem[itemId][size];

          if (quantity > 0) {
            orderItems.push({
              productId: product._id,
              name: product.name,
              image: product.image?.[0],
              price: product.price,
              size,
              quantity,
            });
          }
        }
      }
    }

    return orderItems;
  };

  const subtotal = getOrderItems().reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = delivery_fee;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const orderItems = getOrderItems();

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    for (let key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all customer information");
        return;
      }
    }

    const orderData = {
      items: orderItems,
      customerInfo: formData,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: method,
    };

    const data = await placeOrder(orderData);

    if (data?.success) {
      navigate("/order-status");
    }
  };

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="flex flex-col sm:flex-row gap-8 justify-between pt-10 px-4 sm:px-8"
    >
      <div className="w-full">
        <div className="text-2xl">
          <Title text1="CUSTOMER" text2="INFORMATION FORM" />
        </div>

        <div className="sm:w-3/4 mt-4">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none"
              placeholder="First Name"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none"
              placeholder="Last Name"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none mb-6"
            placeholder="Email Address"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none mb-6"
            placeholder="Full Address"
          />

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none"
              placeholder="Zip Code"
            />

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none"
              placeholder="City Name"
            />
          </div>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none mb-6"
            placeholder="Phone Number"
          />
        </div>
      </div>

      <div className="w-full sm:w-3/4">
        <div className="text-2xl">
          <Title text1="CART" text2="TOTAL" />
        </div>

        <div className="bg-white p-6">
          <div className="flex justify-between">
            <span className="text-lg font-medium">Subtotal:</span>
            <span className="text-lg font-medium">
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between">
            <span className="text-lg font-medium">Delivery Fee:</span>
            <span className="text-lg font-medium">
              {currency}
              {deliveryFee.toFixed(2)}
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">
              {currency}
              {total.toFixed(2)}
            </span>
          </div>

          <hr className="my-4" />

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border py-3 px-6 cursor-pointer ${
                  method === "stripe" ? "border-black" : "border-gray-300"
                }`}
              >
                <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center">
                  {method === "stripe" && (
                    <span className="w-2 h-2 rounded-full bg-black" />
                  )}
                </span>
                <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
              </div>

              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border px-6 py-3 cursor-pointer ${
                  method === "razorpay" ? "border-black" : "border-gray-300"
                }`}
              >
                <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center">
                  {method === "razorpay" && (
                    <span className="w-2 h-2 rounded-full bg-black" />
                  )}
                </span>
                <img
                  src={assets.razorpay_logo}
                  className="h-5"
                  alt="Razorpay"
                />
              </div>

              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border px-6 py-3 cursor-pointer ${
                  method === "cod" ? "border-black" : "border-gray-300"
                }`}
              >
                <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center">
                  {method === "cod" && (
                    <span className="w-2 h-2 rounded-full bg-black" />
                  )}
                </span>
                <span>Cash On Delivery</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={orderLoading}
            className="w-full mt-8 bg-black text-white py-3 font-semibold hover:bg-black/85 transition cursor-pointer disabled:opacity-60"
          >
            {orderLoading ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Orders;
