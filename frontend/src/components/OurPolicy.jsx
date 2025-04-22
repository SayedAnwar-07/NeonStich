import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 ">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center w-full pb-4">
          <img src={assets.exchange_icon} className="w-12" alt="" />
        </div>
        <p className="font-semibold pb-2">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer has free policy</p>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center w-full pb-4">
          <img src={assets.quality_icon} className="w-12" alt="" />
        </div>
        <p className="font-semibold pb-2">7 days Return policy</p>
        <p className="text-gray-400">We provides 7 days free return policy</p>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center w-full pb-4">
          <img src={assets.support_img} className="w-12" alt="" />
        </div>
        <p className="font-semibold pb-2">Best Customer support</p>
        <p className="text-gray-400">We provide 24x7 customer supports</p>
      </div>
    </div>
  );
};

export default OurPolicy;
