import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Reviews from "../components/Reviews";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart,loading,setLoading } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProduct = useCallback(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleImageClick = (img) => {
    setImage(img);
  };

  return (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-2 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto gap-2 justify-baseline sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product Image ${index + 1}`}
                className="w-full object-cover cursor-pointer"
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
          <div className="sm:w-[80%] w-full">
            {" "}
            {/* Corrected width value */}
            <img src={image} className="h-auto w-full" alt="Main Product" />
          </div>
        </div>

        {/* product details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-5" alt="" />
            <img src={assets.star_icon} className="w-5" alt="" />
            <img src={assets.star_icon} className="w-5" alt="" />
            <img src={assets.star_icon} className="w-5" alt="" />
            <img src={assets.star_dull_icon} className="w-5" alt="" />
            <p className="pl-2">(73)</p>
          </div>
          <p className="text-xl md:text-2xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 sm:w-3/4 text-gray-500">{product.description}</p>

          <div className="flex flex-col gap-4 mt-8">
            <p>Sizes</p>
            <div className="flex gap-2">
              {product.sizes.map((item, index) => (
                <button
                  onClick={() => {
                    setSize(item);
                  }}
                  className={`cursor-pointer bg-gray-200 px-3 py-2 4 ${
                    item === size
                      ? "bg-gray-300 border border-gray-400"
                      : "bg-gray-100 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={loading}
              className={`w-full px-10 py-3 mt-4 text-white font-medium rounded transition-colors ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
              onClick={async () => {
                if (!size) {
                  toast.error("Please select a size!");
                  return;
                }
                try {
                  setLoading(true);
                  await addToCart(product._id, size);
                } catch (error) {
                  toast.error("Failed to add to cart");
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                "ADD TO CART"
              )}
            </button>
          </div>
          <hr className="text-gray-300 sm:w-4/5 mt-8" />
          <div className="mt-5 text-gray-500 flex flex-col gap-1 text-sm">
            <p>100% original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy with in 7days</p>
          </div>
        </div>
      </div>

      {/* description and review */}
      <div className="tabs tabs-border mt-16">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Description"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-6 mt-6">
          <p className="text-base text-gray-600 mb-4">
            This product is a perfect blend of innovation, style, and
            practicality, designed to elevate your everyday experiences. It is
            constructed with high-quality materials that ensure long-lasting
            durability, making it a reliable companion for years to come. The
            advanced technology integrated into its design enhances its
            performance, providing seamless functionality and ease of use.
            Whether you're at home, in the office, or on the go, this product
            adapts effortlessly to your lifestyle.
          </p>
          <p className="text-base text-gray-600 mb-4">
            Ideal for a wide range of activities, this product is versatile
            enough to meet the demands of various environments. From busy
            professionals to active individuals, it caters to a diverse
            audience, offering a perfect balance of practicality and
            sophistication. Its intuitive features and hassle-free operation
            make it accessible to users of all levels, while its premium finish
            adds a touch of elegance to your daily routine.
          </p>
          <p className="text-base text-gray-600">
            In summary, this product is more than just a tool—it’s a lifestyle
            enhancer. Combining cutting-edge technology, superior craftsmanship,
            and a timeless design, it is the ultimate choice for those who seek
            comfort, durability, and style in their everyday essentials. Whether
            for personal use or as a thoughtful gift, this product is sure to
            impress and deliver exceptional value.
          </p>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Reviews"
        />
        <div className="tab-content border-base-300 bg-base-100 border-none mt-6">
          <Reviews />
        </div>
      </div>

      {/* related products */}
      <div className="mt-10">
        <RelatedProducts
          category={product.category}
          subCategory={product.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
