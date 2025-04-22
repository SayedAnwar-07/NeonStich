import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";

const OrderStatus = () => {
  const { cartItem, products, currency } = useContext(ShopContext);

  return (
    <div className="p-6">
      <div className="text-3xl">
        <Title text1={"ORDER"} text2={"STATUS"} />
      </div>
      <div className="mt-6">
        {Object.keys(cartItem).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <section className="">
              <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center gap-x-3">
                                <span>Product Image</span>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>Product Name</span>
                            </th>
                            <th
                              scope="col"
                              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>User Info</span>
                            </th>
                            <th
                              scope="col"
                              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>User Number</span>
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>Status</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {Object.keys(cartItem).map((itemId, index) => {
                            const product = products.find(
                              (p) => p._id === itemId
                            );
                            if (!product) return null;

                            return Object.keys(cartItem[itemId]).map((size) => (
                              <tr key={`${itemId}-${size}`}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center gap-x-3">
                                    {index + 1}
                                    <img
                                      src={product.image[0]}
                                      alt={product.name}
                                      className="object-cover w-16 h-16 rounded-md"
                                    />
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      {product.name}
                                    </h2>
                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-2">
                                      <span className="font-semibold text-gray-700">
                                        Size
                                      </span>{" "}
                                      : {size}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="space-x-2">
                                    <p>Saeed Tamim</p>
                                    <p className="text-gray-500 font-normal">
                                      saeedtamim07@gmail.com
                                    </p>
                                  </div>
                                </td>
                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="space-x-2">
                                    <p>01903******</p>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm dark:text-gray-300 whitespace-nowrap">
                                  {currency}
                                  {product.price.toFixed(2)}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {/* delete button */}
                                  <button class="text-gray-500 bg-info/10 px-2 py-1 rounded-full">
                                    <div class="status status-info animate-bounce"></div>
                                    <span className="ml-2">Pending</span>
                                  </button>
                                </td>
                              </tr>
                            ));
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
