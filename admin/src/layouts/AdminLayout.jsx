import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = ({ setToken }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar setToken={setToken} />
      </div>

      <div className="flex flex-1 pt-16">
        <div className="fixed top-16 bottom-0 w-16 md:w-64 lg:w-72">
          <Sidebar />
        </div>
        <div className="flex-1 ml-16 md:ml-64 lg:ml-72 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;