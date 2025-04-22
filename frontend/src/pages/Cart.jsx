import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItem,
    products,
    currency,
    delivery_fee,
    updateQuantity,
    getCartCount,
    removeFromCart,
    loading,
    setLoading,
  } = useContext(ShopContext);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // spinner delay (ms)
    return () => clearTimeout(timer);
  }, [setLoading]);

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (let itemId in cartItem) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        for (let size in cartItem[itemId]) {
          subtotal += product.price * cartItem[itemId][size];
        }
      }
    }
    return subtotal;
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = delivery_fee;
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <span className="flex justify-center text-lg font-base text-gray-600 mt-60">
          <svg
            className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 
                0 0 5.373 0 12h4zm2 5.291A7.962 
                7.962 0 014 12H0c0 3.042 1.135 
                5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading your cart...
        </span>
      </div>
    );
  }
  return (
    <div className="p-6 text-3xl">
      <Title text1={"SHOPPING "} text2={"CART"} />

      <div className="mt-6">
        {Object.keys(cartItem).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <section className="">
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Cart Items
                </h2>
                <span className="px-3 py-1 text-xs text-white rounded-full bg-black">
                  {getCartCount()} items
                </span>
              </div>

              <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-10 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <div className="flex items-center gap-x-3">
                                <span>Image</span>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>Name</span>
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>Size</span>
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>Quantity</span>
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
                              <span>Action</span>
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
                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                      {product.description.slice(0, 40)}...
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                  <span className="py-2 px-3 bg-gray-100 border border-gray-200">
                                    {size}
                                  </span>
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="flex items-center gap-x-2">
                                    <input
                                      type="number"
                                      min="0"
                                      value={cartItem[itemId][size]}
                                      onChange={(e) =>
                                        updateQuantity(
                                          itemId,
                                          size,
                                          parseInt(e.target.value) || 0
                                        )
                                      }
                                      className="w-16 px-2 py-1 border border-gray-300 rounded"
                                    />
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {currency}
                                  {product.price.toFixed(2)}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {/* delete button */}
                                  <button
                                    onClick={() => removeFromCart(itemId, size)}
                                    className="text-gray-500 cursor-pointer transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
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

            {/* Total count */}
            <div className="flex justify-end mt-10">
              <div className="w-full md:max-w-[400px]">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Subtotal:</span>
                  <span className="text-lg font-medium">
                    {currency}
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <hr className="my-4 text-gray-200" />

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-medium">Delivery Fee:</span>
                  <span className="text-lg font-medium">
                    {currency}
                    {deliveryFee.toFixed(2)}
                  </span>
                </div>
                <hr className="my-4 text-gray-200" />

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-xl font-bold">
                    {currency}
                    {total.toFixed(2)}
                  </span>
                </div>
                <hr className="my-4 text-gray-200" />

                <div className="mt-10">
                  <Link to="/orders">
                    <button className="w-full text-base px-10 py-3 bg-black text-white cursor-pointer transition duration-300 ease-in hover:bg-black/80">
                      Place Order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
