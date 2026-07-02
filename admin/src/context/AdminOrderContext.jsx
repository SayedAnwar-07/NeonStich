import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import backendURL from "../components/backendURL";

const AdminOrderContext = createContext(null);

export const useAdminOrders = () => useContext(AdminOrderContext);

export const AdminOrderProvider = ({ children, token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${backendURL}/api/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      const res = await axios.patch(
        `${backendURL}/api/orders/status/${orderId}`,
        { orderStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data.order : order)),
      );

      toast.success("Order status updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <AdminOrderContext.Provider
      value={{ orders, loading, fetchAllOrders, updateOrderStatus }}
    >
      {children}
    </AdminOrderContext.Provider>
  );
};
