import React from "react";
import { assets } from "../assets/admin_assets/assets.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
    toast.success("Logout successfully");
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <img src={assets.logo} className="h-10" alt="Logo" />
        <div>
          <button
            onClick={handleLogout}
            className="bg-black text-white text-xs md:text-base px-6 md:px-8 py-2 rounded-full cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
