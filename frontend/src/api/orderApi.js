import axios from "axios";
import backendURL from "../components/backendURL";

export const placeOrderApi = async (orderData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(`${backendURL}/api/orders/place`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;
};
