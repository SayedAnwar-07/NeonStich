import React, { useContext, useEffect } from "react";
import Title from "../components/Title.jsx";
import { OrderContext } from "../context/OrderContext.jsx";
import { ShopContext } from "../context/ShopContext.jsx";

const OrderStatus = () => {
  const { currency } = useContext(ShopContext);
  const { orders, getUserOrders, orderLoading } = useContext(OrderContext);

  useEffect(() => {
    getUserOrders();
  }, []);

  if (orderLoading) {
    return <p className="p-6">Loading orders...</p>;
  }

  const statusBadge = {
    Processing: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const statusDot = {
    Processing: "bg-yellow-500",
    Shipped: "bg-blue-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  return (
    <div className="p-6">
      <div className="text-3xl">
        <Title text1="ORDER" text2="STATUS" />
      </div>

      <div className="mt-6">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <section>
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                            Product Image
                          </th>
                          <th className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                            Product Name
                          </th>
                          <th className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                            Customer Info
                          </th>
                          <th className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                            Phone
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Price
                          </th>
                          <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {orders.map((order) =>
                          order.items.map((item) => (
                            <tr
                              key={`${order._id}-${item.productId}-${item.size}`}
                            >
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="object-cover w-16 h-16 rounded-md"
                                />
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <h2 className="font-medium text-gray-800 dark:text-white">
                                  {item.name}
                                </h2>

                                <p className="text-sm font-normal text-gray-600 mt-2">
                                  <span className="font-semibold">Size:</span>{" "}
                                  {item.size}
                                </p>

                                <p className="text-sm font-normal text-gray-600">
                                  <span className="font-semibold">Qty:</span>{" "}
                                  {item.quantity}
                                </p>
                              </td>

                              <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <p>
                                  {order.customerInfo?.firstName}{" "}
                                  {order.customerInfo?.lastName}
                                </p>
                                <p className="text-gray-500 font-normal">
                                  <a
                                    href={`mailto:${order.customerInfo?.email}`}
                                    className="text-gray-500 hover:underline"
                                  >
                                    {order.customerInfo?.email}
                                  </a>
                                </p>
                                <p className="text-gray-500 font-normal">
                                  {order.customerInfo?.city},{" "}
                                  {order.customerInfo?.address}
                                </p>
                              </td>

                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                <a
                                  href={`tel:${order.customerInfo?.phone}`}
                                  className="text-gray-500 hover:underline"
                                >
                                  {order.customerInfo?.phone}
                                </a>
                              </td>

                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                {currency}
                                {(item.price * item.quantity).toFixed(2)}
                              </td>

                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium ${statusBadge[order.orderStatus]}`}
                                >
                                  <span
                                    className={`h-2 w-2 rounded-full animate-pulse ${statusDot[order.orderStatus]}`}
                                  ></span>
                                  {order.orderStatus}
                                </span>
                              </td>
                            </tr>
                          )),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
