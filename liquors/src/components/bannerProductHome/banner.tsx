"use client";
import { useRef, useState, useEffect } from "react";
import MapProductCard from "../mapProductCard/mapProductCard";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

const BannerProducts: React.FC = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const cardsPerPage = 3;
  const data = useSelector((state: RootState) => state.products.data);
  const maxSections = Math.ceil(data.length / cardsPerPage) - 1;

  const router = useRouter();

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      if (direction === "left" && currentSection > 0) {
        setCurrentSection(currentSection - 1);
      } else if (direction === "right" && currentSection < maxSections) {
        setCurrentSection(currentSection + 1);
      }
    }
  };

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
      <div className="relative flex justify-center items-center w-full">
        {/*FLECHA IZQUIERDA*/}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 mr-96 p-2 z-10"
          disabled={currentSection === 0}
        >
          <div className="rounded-full bg-wine p-2 ">
            <ArrowBackIosIcon className="h-6 w-6 text-white" />
          </div>
        </button>

        {/*FLECHA DERECHA*/}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 p-2 z-10"
          disabled={currentSection === maxSections}
        >
          <div className="rounded-full bg-wine p-2 ">
            <ArrowForwardIosIcon className="h-6 w-6 text-white" />
          </div>
        </button>

        {/* Contenedor de tarjetas */}
        <div ref={scrollContainer} className="flex overflow-hidden w-full">
          <div className="flex space-x-4 transition-transform duration-500">
            <MapProductCard />
          </div>
        </div>
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
    </div>
  );
};

export default BannerProducts;
