import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Collection from "./pages/Collection";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Cart from "./pages/Cart";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Layout from "./layouts/Layout";
import OrderStatus from "./pages/OrderStatus";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] font-display">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-status" element={<OrderStatus />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
