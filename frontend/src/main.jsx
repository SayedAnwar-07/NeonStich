import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/theme-provider";
import { UserProfileProvider } from "./context/UserProfileContext.jsx";
import OrderContextProvider from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <UserProfileProvider>
        <OrderContextProvider>
          <ThemeProvider defaultTheme="light" storageKey="app-theme">
            <App />
          </ThemeProvider>

          <ToastContainer
            position="top-right"
            toastStyle={{ border: "#e5e7eb" }}
          />
        </OrderContextProvider>
      </UserProfileProvider>
    </ShopContextProvider>
  </BrowserRouter>,
);
