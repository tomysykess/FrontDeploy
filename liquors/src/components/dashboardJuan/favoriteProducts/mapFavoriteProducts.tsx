"use client";
import React, { useEffect, useState } from "react";
import { getFavorites } from "@/utils/getFavorites";
import { FavoriteProductsCard } from "./favoriteProducts";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteProduct } from "@/interfaces/interfaz";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MapUserFavoriteProducts: React.FC = (): React.ReactNode => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const favoriteData = useSelector((state: any) => state.products.favorites);
  console.log("favoritos", favoriteData);

  // ID PARA LA SOLICITUD
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userDataLogin");
    if (userDataFromStorage) {
      const dataParsed = JSON.parse(userDataFromStorage);
      setUserId(dataParsed.id);
    }
  }, []);

  // SOLICITUD GETFAVORITES
  useEffect(() => {
    if (userId) {
      getFavorites(userId, dispatch);
    }
  }, [userId, dispatch, pathname]);

  return (
    <>
      {/*MAPEA UNA CARD DE REVIEW, POR CADA REVIEW DEL USUARIO. */}
      {favoriteData.length === 0 ? (
        <div>
          <h2 className="pb-6 text-gray-600 text-xl font-normal">No hay favoritos</h2>
          <p className="text-gray-600">Busca tu primer favorito <Link href="/product" className="buttonPrimary hover:cursor-pointer">Aqui</Link></p>
        </div>
      ) : (
        favoriteData.map((product: FavoriteProduct) => (
          <div
            key={product.id}
            className="flex justify-start bg-white dark:bg-darkMode-greyVivino"
          >
            <FavoriteProductsCard key={product.id} product={product} />
          </div>
        )))}
    </>
  );
};

