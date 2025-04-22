import React from "react";
import { FaExclamationCircle, FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          {/* Icon */}
          <p className="p-3 text-sm font-medium text-white rounded-full bg-black">
            <FaExclamationCircle className="w-6 h-6" />
          </p>

          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)} 
              className="flex items-center justify-center cursor-pointer w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-black border border-black gap-x-2 sm:w-auto hover:bg-gray-800"
            >
              <FaArrowLeft className="w-5 h-5 rtl:rotate-180" />
              <span>Go back</span>
            </button>
            <button
              onClick={() => navigate("/")} 
              className="w-1/2 px-5 py-2 text-sm cursor-pointer tracking-wide text-white transition-colors duration-200 bg-black shrink-0 sm:w-auto hover:bg-gray-800"
            >
              <FaHome className="inline-block w-5 h-5 mr-2" />
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
