"use client";
import { Product } from "@/interfaces/interfaz";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from 'next/image';

export const ProductDetail = ({ product }: { product: Product }) => {
  const { abv, brand, category, country, description, id, imgUrl, name, size } = product;

  const [favorite, setFavorite] = useState(false);

  const handlerOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFavorite(!favorite);
  };

  return (
    <div key={id} className="flex flex-row gap-10 p-4 bg-white rounded shadow-md ">
      <div className="w-1/3 flex items-center justify-center">
        <Image
          src={imgUrl}
          alt={name}
          className="imageProductDetail w-full h-auto rounded"
          width={500} // Ajusta estos valores según sea necesario
          height={500} // Ajusta estos valores según sea necesario
          layout="responsive"
        />
      </div>
      <div className="w-2/3 space-y-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-black text-2xl font-semibold">{name}</h2>
          <div className="flex flex-row items-center">
            <Rating
              name="product-rating"
              value={4}
              precision={0.5}
              readOnly
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarIcon fontSize="inherit" />}
            />
            <span className="text-black ml-2"></span>
          </div>
          <h3 className="text-black text-lg">{category}</h3>
          <p className="text-black">
            <b>Origen:</b> {country} | <b>Marca:</b> {brand}
          </p>
          <p className="text-black">
            <b>ABV:</b> {abv}% | <b>Tamaño:</b> {size}
          </p>
          <button
            onClick={handlerOnClick}
            className="flex items-center mt-4 text-red-600"
          >
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span className="ml-2">
              {favorite ? "Remover de Favoritos" : "Agregar a Favoritos"}
            </span>
          </button>
        </div>
        <p className="text-black">{description}</p>
      </div>
    </div>
  );
};
