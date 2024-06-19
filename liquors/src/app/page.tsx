"use client";
import Carousel from "@/components/carousel/Carousel";
import BannerProducts from "@/components/bannerProductHome/banner";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BannerProductsGin from "@/components/bannerProductHome/bannerGin";
import SuscribeCards from "@/components/suscribeCards/SuscribeCards";
import { BannerProductsWine } from "@/components/bannerProductHome/bannerWine";
import "./globals.css";

export default function Landing() {
  return (
    <div>
      <Carousel />

      <div className="flex flex-col bg-greyVivino dark:bg-darkMode-greyVivino scroll-smooth overflow-auto pt-10 items-center">
        {/*SECCION UNO DE TARJETAS (todas las categorias) */}
        <h1 className="text-center text-2xl text-black dark:text-darkMode-white font-plus-jakarta-sans font-normal mb-4">
          Explora <b className="text-wine">todas</b> las categorías
        </h1>
        <ExpandMoreIcon className="flex items-center" />
        <div className="flex space-x-4">
          <BannerProducts />
        </div>

        {/*SECCION DOS DE TARJETAS (solo gins) */}
        <div className="w-full bg-black">
          <h1 className="text-center font-plus-jakarta-sans text-2xl mt-6 text-white font-normal mb-4 relative z-10">
            Prueba <b className="text-gin">Ginebra</b>
          </h1>
        </div>
        <ExpandMoreIcon className="flex items-center mt-6" />
        <div className="flex space-x-4">
          {/*FILTRA DESDE EL BACK SOLO GIN */}
          <BannerProductsGin />
        </div>

        {/*SECCION TRES DE TARJETAS (aqui podria ir otra a eleccion*/}
        <div className="w-full bg-grey4">
          <h1 className="text-center font-plus-jakarta-sans text-2xl mt-6 text-white font-normal mb-4 relative z-10">
            Prueba <b className="text-wine">Vinos</b>
          </h1>
        </div>

        <ExpandMoreIcon className="flex items-center mt-6" />
        <div className="flex space-x-4">
          {/*FILTRA DESDE EL BACK SOLO WINE */}
          <BannerProductsWine />
        </div>
      </div>
      <SuscribeCards />
    </div>
  );
}
