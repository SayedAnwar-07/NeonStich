import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import backendURL from "../../components/allURL";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllProducts = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/products/all-products`);
      const products = res.data.data;
      setList(products);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId, productName) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete "${productName}". This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        // Show loading state
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the product",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await axios.delete(
          `${backendURL}/api/products/delete-product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          Swal.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchProducts();
        } else {
          throw new Error(response.data.message || "Failed to delete product");
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete product",
        icon: "error",
      });
    }
  };

  // filter
  const filteredProducts = list.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="text-3xl">
        <Title text1={"All"} text2={"Products"} />
      </div>
      <div className="flex my-4">
        <input
          type="text"
          className="w-[93%] outline-none border border-gray-300 p-3"
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-black text-white px-6 py-3 ml-2"
          onClick={() => fetchProducts()}
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
                IMAGE
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                NAME
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                PRICE
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                CATEGORY
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                SUB-CATEGORY
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                SIZES
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                BESTSELLER
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td className="pl-1 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span>{index + 1}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {product.image?.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price}
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap text-sm font-medium
                    ${product.category === "Men" ? "bg-blue-50" : ""}
                    ${product.category === "Women" ? "bg-pink-50" : ""}
                    ${product.category === "Kids" ? "bg-green-50" : ""}
                  `}
                >
                  {product.category}
                </td>

                <td className="">
                  <span
                    className={`ml-4 px-4 py-1 whitespace-nowrap text-sm rounded-full text-gray-700 border border-gray-200 text-center
                              ${
                                product.subCategory === "Topwear"
                                  ? "bg-orange-100"
                                  : ""
                              }
                              ${
                                product.subCategory === "Bottomwear"
                                  ? "bg-purple-100"
                                  : ""
                              }
                              ${
                                product.subCategory === "Winterwear"
                                  ? "bg-cyan-100"
                                  : ""
                              }
                            `}
                  >
                    {product.subCategory}
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sizes?.join(", ")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-4 py-1 rounded-full  ${
                      product.bestseller
                        ? "bg-green-100 text-gray-700"
                        : "bg-amber-100 text-gray-700"
                    }`}
                  >
                    {product.bestseller ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
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

                    <Link
                      to={`/update-product/${product._id}`}
                      className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
