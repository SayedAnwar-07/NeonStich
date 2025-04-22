import React, { useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import backendURL from "../../components/allURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title";

const AddProduct = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append images
      images.forEach((image, index) => {
        if (image) formDataToSend.append(`image${index + 1}`, image);
      });

      // Append other form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "sizes") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      const res = await axios.post(
        `${backendURL}/api/products/add-product`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      navigate("/all-products");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.res?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-3xl">
        <div className="text-3xl">
          <Title text1={"Add New"} text2={"Product"} />
        </div>
        {/* Image Upload Section */}
        <div>
          <h2 className="text-lg mb-2">Upload Photos</h2>
          <div className="flex gap-4 flex-wrap">
            {images.map((image, index) => (
              <label
                key={index}
                htmlFor={`image-${index}`}
                className="cursor-pointer"
              >
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={assets.upload_area}
                      alt="Upload area"
                      className="w-3/4 opacity-70"
                    />
                  )}
                </div>
                <input
                  type="file"
                  id={`image-${index}`}
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 outline-none rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 outline-none rounded"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 outline-none rounded min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 outline-none rounded"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Sub Category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 outline-none rounded"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block font-medium">Available Sizes</label>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 rounded ${
                    formData.sizes.includes(size)
                      ? "bg-gray-800 cursor-pointer text-white"
                      : "bg-gray-200 cursor-pointer hover:bg-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bestseller"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleInputChange}
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="bestseller"
              className="font-medium cursor-pointer text-gray-800 hover:text-black transition duration-300"
            >
              Mark as Best Seller
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition mt-4 flex justify-center items-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Adding Product...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
