'use client'
import { MapUserFavoriteProducts } from "@/components/dashboardJuan/favoriteProducts/mapFavoriteProducts";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import React,{ useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const FavoriteProduct: React.FC = (): React.ReactNode => {

    /*const getToken = () => {
        if (typeof window !== "undefined" && window.localStorage) {
          return localStorage.getItem("loginToken") || null;
        }
        return null;
      };

    const [token] = useState(getToken)

  
    const router = useRouter()

    useEffect(() => {
      if (!token) {
          router.push("/");
      }
    },[]);*/

  return (
        <>
          <div className="bg-greyVivino  dark:bg-darkMode-greyVivino flex flex-row pt-1 mb-0 h-full min-h-screen  overflow-x-hidden">
            <MenuDashboard />
            <div className=" w-full">
              <h1 className="font-plus-jakarta-sans pt-4 text-3xl text-center text-wine font-semibold">Favoritos</h1><br></br>
              <div className="flex flex-col pt-1 items-center w-full">
                <hr className="w-full border-gray-300" />
                <br />
                <div className="flex ml-36  items-center w-full">
                  <LabelImportantIcon style={{ color: '#c23a2e' }} className="flex-shrink-0" />
                  <h2 className="font-plus-jakarta-sans text-2xl text-start font-semibold ml-2 dark:text-darkMode-white">Mis favoritos</h2>
                </div>
                <br />
                <MapUserFavoriteProducts />
              </div>
            </div>
          </div>
        </>
      )
};

export default FavoriteProduct;