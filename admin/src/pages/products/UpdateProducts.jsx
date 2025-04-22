import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import backendURL from "../../components/allURL";
import Title from "../../components/Title";
import { assets } from "../../assets/admin_assets/assets";

const UpdateProducts = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [subCategory, setSubCategory] = useState("Topwear");
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (!data.success) throw new Error(data.message);

        const productData = data.data || data.product;
        if (!productData) throw new Error("Product data is missing");

        setProduct(productData);
        setName(productData.name || "");
        setDescription(productData.description || "");
        setPrice(productData.price || "");
        setCategory(productData.category || "Men");
        setBestseller(productData.bestseller || false);
        setSizes(productData.sizes || []);
        setSubCategory(productData.subCategory || "Topwear");

        // Store existing images
        if (productData.images && productData.images.length > 0) {
          const formattedImages = [
            { url: productData.image1, name: "image1" },
            { url: productData.image2, name: "image2" },
            { url: productData.image3, name: "image3" },
            { url: productData.image4, name: "image4" },
          ].filter((img) => img.url);

          setExistingImages(formattedImages);
        }
      } catch (error) {
        console.error(
          "Error fetching product:",
          error.response?.data || error.message
        );
        toast.error(error.response?.data?.message || "Error fetching product");
      }
    };

    if (id) fetchProduct();
  }, [id, token]);

  const handleFileChange = (e, index) => {
    const imageName = `image${index + 1}`;
    const file = e.target.files[0];

    if (file) {
      setImageFiles({
        ...imageFiles,
        [imageName]: file,
      });

      // Update preview for the specific image
      const reader = new FileReader();
      reader.onload = () => {
        setExistingImages((prev) => {
          const updated = [...prev];
          const existingIndex = updated.findIndex(
            (img) => img.name === imageName
          );

          if (existingIndex >= 0) {
            updated[existingIndex] = {
              ...updated[existingIndex],
              url: reader.result,
            };
          } else {
            updated.push({ url: reader.result, name: imageName });
          }

          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("subCategory", subCategory);

      Object.keys(imageFiles).forEach((key) => {
        if (imageFiles[key]) {
          formData.append(key, imageFiles[key]);
        }
      });

      const { data } = await axios.put(
        `${backendURL}/api/products/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Ensure token is included
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      navigate("/all-products");
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current token:", token);
  }, [token]);

  if (!product)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-xl">Loading product...</h2>
      </div>
    );

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-3xl">
        <div className="text-3xl">
          <Title text1={"Update"} text2={"Product"} />
        </div>

        {/* Image Upload Section */}
        <div>
          <h2 className="text-lg mb-2">Upload Photos</h2>
          <div className="flex gap-4 flex-wrap">
            {[0, 1, 2, 3].map((index) => {
              const imageName = `image${index + 1}`;
              const existingImage = existingImages.find(
                (img) => img.name === imageName
              );
              const isImageSet = existingImage || imageFiles[imageName];

              return (
                <label
                  key={index}
                  htmlFor={`image-${index}`}
                  className="cursor-pointer"
                >
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                    {isImageSet ? (
                      <img
                        src={
                          existingImage?.url ||
                          URL.createObjectURL(imageFiles[imageName])
                        }
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
                    onChange={(e) => handleFileChange(e, index)}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 outline-none rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 outline-none rounded"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 outline-none rounded min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
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
                    sizes.includes(size)
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
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
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
              Updating Product...
            </>
          ) : (
            "Update Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
