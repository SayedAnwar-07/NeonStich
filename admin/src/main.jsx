import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminOrderProvider } from "./context/AdminOrderContext";

const token = localStorage.getItem("token");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminOrderProvider token={token}>
      <App />
      <ToastContainer position="top-right" toastStyle={{ border: "#e5e7eb" }} />
    </AdminOrderProvider>
  </BrowserRouter>,
);
