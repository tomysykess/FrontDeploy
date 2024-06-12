"use client";
import "./globals.css";
import BannerProducts from "@/components/bannerProductHome/banner";
import BannerProductsGin from "@/components/bannerProductHome/bannerGin";
import Carousel from "@/components/carousel/Carousel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SuscribeCards from "@/components/suscribeCards/SuscribeCards";

export default function Landing() {
  return (
    <div>
      <Carousel></Carousel>

      <div className="flex flex-col bg-greyMLfilter scroll-smooth overflow-auto pt-10 items-center">
        {/*SECCION UNO DE TARJETAS (todas las categorias) */}
        <h1 className="text-center text-2xl text-black font-plus-jakarta-sans font-normal mb-4">
          Explore <b className="text-wine">all</b> categories
        </h1>
        <ExpandMoreIcon className="flex items-center" />
        <div className="flex space-x-4">
          <BannerProducts />
        </div>

        {/*SECCION DOS DE TARJETAS (solo gins) */}
        <div className="w-full bg-black">
          <h1 className="text-center font-plus-jakarta-sans text-2xl mt-6 text-white font-normal mb-4 relative z-10">
            Only <b className="text-gin">Gins</b>
          </h1>
        </div>

        <ExpandMoreIcon className="flex items-center mt-6" />
        {/*FILTRA DESDE EL BACK SOLO GIN */}
        <div className="flex space-x-4">
          <BannerProductsGin />
        </div>

        {/*SECCION TRES DE TARJETAS (aqui podria ir otra a eleccion*/}
        <div className="w-full bg-grey4">
          <h1 className="text-center font-plus-jakarta-sans text-2xl mt-6 text-white font-normal mb-4 relative z-10">
            Only <b className="text-wine">Wines</b>
          </h1>
        </div>

        <ExpandMoreIcon className="flex items-center mt-6" />
      </div>
      <SuscribeCards />
    </div>
  );
}
