"use client";
import React, { useEffect, useState } from "react";
import { getFavorites } from "@/utils/getFavorites";
import { FavoriteProductsCard } from "./favoriteProducts";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteProduct } from "@/interfaces/interfaz";

export const MapUserFavoriteProducts: React.FC = (): React.ReactNode => {
  const dispatch = useDispatch();
  const favoriteData = useSelector((state: any) => state.products.favorites);
  console.log("favoritos", favoriteData);

  //ID PARA LA SOLICITUD
  const [userId, setDataUser] = useState({
    id: "",
  });

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userDataLogin");
    if (userDataFromStorage) {
      const dataParsed = JSON.parse(userDataFromStorage);
      setDataUser({ id: dataParsed.id });
    }
  }, []);

  //SOLICITUD GETFAVORITES
  useEffect(() => {
    if (favoriteData.length === 0 && userId.id) {
      getFavorites(userId.id, dispatch);
    }
  }, [userId, dispatch, favoriteData.length]);

  return (
    <>
      {/*MAPEA UNA CARD DE REVIEW, POR CADA REVIEW DEL USUARIO. */}
      {favoriteData.map((product: FavoriteProduct) => (
        <div
          key={product.id}
          className="flex  justify-start bg-white dark:bg-darkMode-greyVivino"
        >
          <FavoriteProductsCard key={product.id} product={product} />
        </div>
      ))}
    </>
  );
};
