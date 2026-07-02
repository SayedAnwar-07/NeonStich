import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import backendURL from "../components/backendURL";

export const OrderContext = createContext(null);

const OrderContextProvider = ({ children }) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getToken = () => localStorage.getItem("token");

  const placeOrder = async (orderData) => {
    const token = getToken();

    if (!token) {
      toast.error("Please login first");
      return null;
    }

    setOrderLoading(true);

    try {
      const { data } = await axios.post(
        `${backendURL}/api/orders/place`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );

      toast.success(data.message || "Order placed successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
      return null;
    } finally {
      setOrderLoading(false);
    }
  };

  const getUserOrders = async () => {
    const token = getToken();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    setOrderLoading(true);

    try {
      const { data } = await axios.get(`${backendURL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setOrders(data.orders || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        placeOrder,
        getUserOrders,
        orders,
        orderLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
