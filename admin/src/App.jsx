import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./layouts/AdminLayout";
import AddProduct from "./pages/products/AddProduct";
import UpdateProducts from "./pages/products/UpdateProducts";
import AllProducts from "./pages/products/AllProducts";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import AllUsers from "./pages/AllUsers";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div>
      <Routes>
        {token === "" ? (
          <>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route path="/" element={<AdminLayout setToken={setToken} />}>
            <Route index element={<AdminDashboard token={token} />} />
            <Route path="add-product" element={<AddProduct token={token} />} />
            <Route
              path="update-product/:id"
              element={<UpdateProducts token={token} />}
            />
            <Route
              path="all-products"
              element={<AllProducts token={token} />}
            />
            <Route path="orders" element={<Orders token={token} />} />
            <Route path="all-users" element={<AllUsers token={token} />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
