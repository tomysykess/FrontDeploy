"use client";
import React, { useEffect, useState } from "react";
import { getFavorites } from "@/utils/getFavorites";
import { FavoriteProductsCard } from "./favoriteProducts";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteProduct } from "@/interfaces/interfaz";
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined';

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

  if (favoriteData.length === 0) {
    return <div className="font-plus-jakarta-sans dark:text-darkMode-greyMLfilter"><FmdBadOutlinedIcon/>Aun no tienes ningun favorito.</div>;
  }

  return (
    <>
      {/*MAPEA UNA CARD DE REVIEW, POR CADA REVIEW DEL USUARIO. */}
      {favoriteData.map((product: FavoriteProduct) => (
        <div
          key={product.id}
          className="flex  justify-start bg-greyVivino dark:bg-darkMode-greyVivino"
        >
          <FavoriteProductsCard key={product.id} product={product} />
        </div>
      ))}
    </>
  );
};
