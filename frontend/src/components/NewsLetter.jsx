import React from "react";
// import { assets } from "../assets/frontend_assets/assets.js";
const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <h2 className="text-2xl font-medium text-gray-700">
        Subscribe now & get 20% off
      </h2>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
        voluptatem!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none border border-gray-300 px-10 py-4"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white px-10 py-4 cursor-pointer transition delay-300 ease-out hover:bg-gray-800"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
