import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Slider } from "@mui/material";

const Collection = () => {
  const { products, getProductsData } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let filtered = products;
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterProducts(filtered);
    setCurrentPage(1);
  }, [category, subCategory, priceRange, products, searchTerm]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-4">
      {/* Filters */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 ml-2 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Price Range Slider */}
        <div
          className={`mt-6 px-4 ${showFilter ? "block" : "hidden sm:block"}`}
        >
          <p className="mb-3 text-sm font-medium text-gray-800">Price Range</p>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={400}
            step={10}
            aria-labelledby="price-range-slider"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        {/* Categories Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium text-gray-800">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                value="Men"
              />
              <span>Men</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                value="Women"
              />
              <span>Women</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                value="Kids"
              />
              <span>Kids</span>
            </label>
          </div>
        </div>

        {/* Type Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "block" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium text-gray-800">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                value="Topwear"
              />
              <span>Topwear</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                value="Bottomwear"
              />
              <span>Bottomwear</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                value="Winterwear"
              />
              <span>Winterwear</span>
            </label>
          </div>
        </div>
      </div>

      {/* All products */}
      <div className="flex-1">
        <div className="flex justify-baseline text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTIONS"} />
        </div>
        {/* search */}
        <div className="mb-6 relative w-ful">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-1">
            <input
              type="text"
              className="w-full px-4 py-2 pl-10 border border-gray-300 focus:ring-black focus:outline-none"
              placeholder="Search products..."
              onChange={handleSearchChange}
            />
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
          </form>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil(filterProducts.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
