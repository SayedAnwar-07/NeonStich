import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import hero1 from "../assets/hero2.jpg";
import hero2 from "../assets/hero3.jpg";
import hero3 from "../assets/hero4.webp";
import sale from "../assets/sale.jpg";
import offers from "../assets/offers.jpg";

const images = [hero1, hero2, hero3];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="relative w-full lg:w-[60vw] h-[400px] lg:h-[600px] overflow-hidden rounded-lg ">
        {/* Slider Images */}
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <GoChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <GoChevronRight size={24} />
        </button>

        {/* Dot Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[38vw] flex flex-col gap-2">
        <div className="h-full lg:h-[297px]">
          <img
            src={sale}
            alt="Hero 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="h-full lg:h-[297px]">
          <img
            src={offers}
            alt="Hero 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
