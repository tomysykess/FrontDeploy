"use client";
import React, { useState, useEffect } from "react";
import { FavoriteProduct } from "@/interfaces/interfaz";
import { Rating } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteFavorites } from "@/utils/deteleFavorites";
import { Product } from "@/interfaces/interfaz";
import { useDispatch } from "react-redux";

export const FavoriteProductsCard = ({
  product,
}: {
  product: FavoriteProduct;
}) => {
  const dispatch = useDispatch();
  const [userId, setIdUser] = useState<string>();

  useEffect(() => {
    const idUser: any = localStorage.getItem("userDataLogin");
    const idUserParsed = JSON.parse(idUser);
    if (idUser) {
      setIdUser(idUserParsed.id);
    }
  }, []);

  //handler borrado favs
  const deleteFav = (product: FavoriteProduct) => {
    const productId = product.id;
    deleteFavorites(userId, productId, dispatch);
  };

  return (
    <div className="flex items-start max-w-2xl pr-72 border-r-8 font-plus-jakarta-sans border-r-wine shadow-lg bg-white dark:bg-darkMode-greyVivino rounded-lg p-4 m-4 relative">
      {/* Imagen a la izquierda */}
      <div className="flex-shrink-0 h-full ">
        <img
          className="h-full w-32 object-cover rounded-md"
          src={product.imgUrl}
          alt="Imagen de producto"
        />
      </div>
      {/* Contenedor de texto a la derecha */}
      <div className="flex flex-col flex-grow ml-4">
        {/* Nombre */}
        <h2 className="text-base text-gray-700 font-bold dark:text-darkMode-white">
          Producto
        </h2>
        <p className="text-sm text-gray-600 dark:text-darkMode-white">
          {product.name}
        </p>
        {/* Descripción */}
        <hr className="w-full my-2"></hr>
        <h2 className="text-base pt-2 text-gray-700 font-bold dark:text-darkMode-white">
          Descripcion
        </h2>
        <p className="text-sm text-gray-600 dark:text-darkMode-white">
          {product.description}
        </p>
        {/* Rate (Estrellas) */}
        <hr className="w-full my-2"></hr>
        <div className="flex items-center pt-2 mt-2">
          <span className="text-base text-gray-700 font-bold dark:text-darkMode-white">
            Rate
          </span>
          <Rating
            name="read-only"
            value={product.rate}
            readOnly
            className="ml-auto dark:text-darkMode-white"
          />
        </div>
        {/* Categoria */}
        <hr className="w-full my-2"></hr>
        <h2 className="text-base text-gray-700  pt-2 font-bold dark:text-darkMode-white">
          Categoria
        </h2>
        <p className="text-sm text-gray-600 dark:text-darkMode-white">
          {product.category}
        </p>
        {/* Abv */}
        <hr className="w-full my-2"></hr>
        <h2 className="text-base text-gray-700 pt-2 font-bold dark:text-darkMode-white">
          Abv
        </h2>
        <p className="text-sm text-gray-600 dark:text-darkMode-white">
          {product.abv}
        </p>
        {/* Icono de eliminar */}
        <button onClick={() => deleteFav(product)}>
          <DeleteOutlineIcon className="absolute bottom-2 right-2 cursor-pointer dark:text-darkMode-white" />
        </button>
      </div>
    </div>
  );
};
