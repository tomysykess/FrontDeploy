"use client";
import React from "react";
//material UI
import HalfRating from "../ratingStar/ratingstar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//interface
import { Product } from "@/interfaces/interfaz";
//utils (logica para color borde top condicional.)
import { getColorClass } from "@/utils/cardBorderColorDinamic";
//next/image
import Image from 'next/image';

const ProductCard: React.FC<{ product: Product}> = ({product}): React.ReactNode => {
  return (
    <div
      className={`flex flex-col relative bg-white items-center h-96 border-t-8 hover:cursor-pointer rounded-t-xl border-solid border-t-wine border-wine border-2 rounded-lg p-4 m-4 w-48`}>
      <h2 className="text-center text-lg font-Lora mb-2">{product.name}</h2>
      <img
        className="my-2 h-48 w-48 object-cover rounded-md"
        src={product.imgUrl}
        alt="imagen bebida"
        width={192} // valor en píxeles para la anchura de la imagen
        height={192} // valor en píxeles para la altura de la imagen
     /*    layout="responsive" */
      />
      <br></br>
      <div className="flex flex-row absolute bottom-4 pl-1 pr-1 left-0 right-0 items-center justify-between w-full mt-2">
        <span className="text-gray-700">4.5</span>
        <div className="flex flex-row justify-center flex-grow mx-2">
          <HalfRating />
        </div>
        <FavoriteBorderIcon className="text-wineMasOscuro " />
      </div>
    </div>
  );
};

export default ProductCard;
