import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { GrFacebookOption } from "react-icons/gr";
import { CiInstagram } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-20 py-8 bg-[#eeeeee]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Logo and Description */}
          <div className="md:w-1/2">
            <Link to="/">
              <img src={assets.logo} alt="logo" className="w-36 mb-4" />
            </Link>
            <p className="text-gray-600 max-w-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae,
              esse aperiam quaerat incidunt itaque magnam vel perspiciatis
              pariatur totam fuga!
            </p>
            {/* Social Icons */}
            <div className="flex space-x-6 pt-6">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <GrFacebookOption size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                <CiInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <RiTwitterXFill size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Policy Links and Social Icons */}
          <div className="md:w-1/2 w-full flex flex-row items-start md:items-center justify-around gap-8">
            {/* Policy Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Our Store
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-600">+880190********</li>
                <li className="text-gray-600">saeedtamim07@gmail.com</li>
                <li className="text-gray-600">Mollah Market, 1421 Fatullah</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu</h3>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/collection"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Collection
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* Copyright */}
        <div className="text-center text-gray-500">
          <p>
            &copy; 2025 All rights reserved. Made by{" "}
            <span
              href="#"
              className="text-gray-900 hover:text-gray-700 transition-colors"
            >
              Sayed Anwar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
