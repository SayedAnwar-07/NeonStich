import React from "react";
import { NavLink } from "react-router-dom";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { BsCart2 } from "react-icons/bs";
const Sidebar = () => {
  return (
    <div className="bg-white shadow-md h-screen fixed md:relative w-16 md:w-64 lg:w-72">
      <div className="md:pl-4 px-1 py-4 flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-full transition-colors ${
              isActive
                ? "bg-black text-white"
                : "border border-gray-300 border-r-0 hover:bg-gray-100"
            }`
          }
        >
          <RxDashboard className="w-5 h-5" />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
        <NavLink
          to="/add-product"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-full transition-colors ${
              isActive
                ? "bg-black text-white"
                : "border border-gray-300 border-r-0 hover:bg-gray-100"
            }`
          }
        >
          <MdOutlineLibraryAdd className="w-5 h-5" />
          <p className="hidden md:block">Add Product</p>
        </NavLink>
        <NavLink
          to="/all-products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-full transition-colors ${
              isActive
                ? "bg-black text-white"
                : "border border-gray-300 border-r-0 hover:bg-gray-100"
            }`
          }
        >
          <CiBoxList className="w-5 h-5" />
          <p className="hidden md:block">All Products</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-full transition-colors ${
              isActive
                ? "bg-black text-white"
                : "border border-gray-300 border-r-0 hover:bg-gray-100"
            }`
          }
        >
          <BsCart2 className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          to="/all-users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-full transition-colors ${
              isActive
                ? "bg-black text-white"
                : "border border-gray-300 border-r-0 hover:bg-gray-100"
            }`
          }
        >
          <PiUsersThree className="w-5 h-5" />
          <p className="hidden md:block">All Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
