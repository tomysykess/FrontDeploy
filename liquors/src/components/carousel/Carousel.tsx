"use client";
import React, { useEffect, useState } from "react";
import { arrayCarousel, arrayColors } from "@/utils/arrayCarousel";
import { arrayTexts } from "@/utils/arrayCarousel";
/* de momento este array no lo voy a usar, pero la idea es que se vea al cambiar el state, y cambie junto con la imagen */

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === arrayCarousel.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === arrayCarousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? arrayCarousel.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container relative min-h-96 overflow-visible bg-greyVivino dark:bg-darkMode-greyVivino">
      {arrayCarousel.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 bg-greyVivino dark:bg-darkMode-greyVivino ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      ))}

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-greyVivino dark:bg-darkMode-greyVivino p-2 rounded-full shadow-md"
        onClick={prevImage}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-greyVivino dark:bg-darkMode-greyVivino  p-2 rounded-full shadow-md"
        onClick={nextImage}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
