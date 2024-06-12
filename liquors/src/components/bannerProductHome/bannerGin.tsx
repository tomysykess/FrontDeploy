"use client";
import React, { useRef, useState, useEffect } from "react";
import MapProductCardGin from "../mapProductCard/mapProductCardGin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const BannerProductsGin: React.FC = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const cardsPerPage = 3;
  const data = useSelector((state: RootState) => state.products.data);
  
  // Calcula el número máximo de secciones basado en la cantidad de tarjetas y tarjetas por página.
  const maxSections = Math.ceil(data.length / cardsPerPage) - 1;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      if (direction === "left" && currentSection > 0) {
        setCurrentSection(currentSection - 1);
      } else if (direction === "right" && currentSection < maxSections) {
        setCurrentSection(currentSection + 1);
      }
    }
  };

  // UseEffect para ajustar la posición del scroll del contenedor de tarjetas
  useEffect(() => {
    if (scrollContainer.current) {
      const scrollAmount = scrollContainer.current.offsetWidth;
      scrollContainer.current.scrollTo({
        left: currentSection * scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentSection]);

  return (
    <div className="relative flex justify-center flex-col pt-7 pb-4 bg-greyMLfilter w-11/12 max-w-screen-lg mx-auto">
      <div className="flex justify-center items-center relative w-full">
        {/* FLECHA IZQUIERDA */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0  mr-96 p-2 z-10"
          disabled={currentSection === 0}
        >
          <div className="rounded-full bg-wine p-2 ">
          
          <ArrowBackIosIcon className="h-6 w-6 text-white" />
          
          </div>
        </button>
        {/* Contenedor de tarjetas */}
        <div ref={scrollContainer} className="flex overflow-hidden w-full">
          <div className="flex space-x-4 transition-transform duration-500">
            <MapProductCardGin />
          </div>
        </div>

        {/* FLECHA DERECHA */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 p-2 z-10"
          disabled={currentSection === maxSections}
        >
          <div className="rounded-full bg-wine p-2 ">
          <ArrowForwardIosIcon className="h-6 w-6 text-white" />
          </div>
        </button>
      </div>
      <section className="flex justify-start text-white mt-4"></section>
    </div>
  );
};

export default BannerProductsGin;
