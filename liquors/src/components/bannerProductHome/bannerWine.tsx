"use client";
import React, { useRef, useState, useEffect } from "react";
import MapProductCardWine from "../mapProductCard/mapProductCardWine";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
//import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useRouter } from "next/navigation";

export const BannerProductsWine: React.FC = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const cardsPerPage = 3;
  const dataGlobal = useSelector((state: any) => state.products.data);
  const router = useRouter();

  // Calcula el número máximo de secciones basado en la cantidad de tarjetas y tarjetas por página.
  const maxSections = Math.ceil(dataGlobal.length / cardsPerPage) - 1;

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
    <div className="relative flex justify-center flex-col pt-7 pb-4 bg-greyVivino  dark:bg-darkMode-greyVivino w-11/12 max-w-screen-lg mx-auto">
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
            <MapProductCardWine />
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
      {/* Botón "Ver más" */}
      {currentSection === maxSections && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => router.push("/product")}
            className="bg-wine text-white py-2 px-4 rounded-md"
          >
            Ver más
            <LastPageIcon className="mr-1 ml-3" />
          </button>
        </div>
      )}
      <section className="flex justify-start text-white mt-4"></section>
    </div>
  );
};
