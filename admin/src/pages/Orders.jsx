import { useEffect } from "react";
import { useAdminOrders } from "../context/AdminOrderContext";
import AdminOrderCard from "../components/AdminOrderCard";
import Title from "../components/Title";

const Orders = () => {
  const { orders, loading, fetchAllOrders } = useAdminOrders();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return <p className="p-4">Loading orders...</p>;
  }

  return (
    <div className="p-4">
      <div className="text-3xl">
        <Title text1={"All"} text2={"Orders"} />
      </div>

      <div className="flex my-4">
        <button
          onClick={fetchAllOrders}
          className="bg-black text-white px-10 py-3 rounded-full"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left text-gray-500"></th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                ORDER ID
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                CUSTOMER
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                EMAIL
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                ITEMS
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                TOTAL
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                PAYMENT
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                STATUS
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <AdminOrderCard key={order._id} order={order} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
