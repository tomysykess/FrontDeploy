"use client";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SubscriptionBox from "@/components/dashboardJuan/cajaDelMes/caja";

const CajaMes: React.FC = (): React.ReactNode => {
  /*const getToken = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("loginToken") || null;
    }
    return null;
  };

  const getRole = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("userDataLogin") || null;
    }
    return null;
  }
  
  const [token] = useState(getToken)
  const [role] = useState<any>(getRole);*/

  const router = useRouter();

  /* useEffect(() => {
    if (!token) {
        router.push("/");
    }
    if (token) {
      const rol = JSON.parse(role)
      if (rol.role =! 4 || rol.role != "4") {
        router.push("/profile")
      }
    }
  },[]);*/

  return (
    <>
      <div className="bg-greyVivino dark:bg-darkMode-greyVivino flex pb-9 flex-row pt-1 mb-1 h-screen">
        <MenuDashboard />
        <div className="overflow-y-auto flex flex-col justify-center items-center w-full">
          <h1 className="font-plus-jakarta-sans pt-40 text-3xl text-center font-normal dark:text-darkMode-white">
            Suscribite a nuestra <span className="text-wine">caja del mes</span>
          </h1>
          <hr></hr>
          <br />
          <div className="flex flex-col items-center justify-center min-h-screen py-10">
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 items-center mb-10">
              {/* Elemento hermano */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold dark:text-darkMode-white">
                  En esta caja encontrarás la bebida con mejor promedio de
                  review!
                </h1>
                <h2 className="text-lg dark:text-darkMode-white">
                  Consegui la tuya subscribiendote a premiun y recibi una caja
                  por mes!
                </h2>
                <div className="flex space-x-4 mt-4">
                  <div className="flex flex-col items-center">
                    <LabelImportantIcon
                      fontSize="large"
                      className="dark:text-darkMode-white"
                    />
                    <span className="dark:text-darkMode-white">
                      Producto Premium
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <LocalShippingIcon
                      fontSize="large"
                      dark:text-darkMode-white
                    />
                    <span className="dark:text-darkMode-white">
                      Envío Rápido
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <br />
            {/* Este es el componente de la caja */}
            <SubscriptionBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default CajaMes;
