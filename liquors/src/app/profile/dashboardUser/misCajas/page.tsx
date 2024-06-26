"use client";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import MapProductCaja from "@/components/dashboardJuan/cajaDelMes/mapProductCaja";

const MisCajas: React.FC = (): React.ReactNode => {
  const [token, setToken] = useState(null);

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
    
      const [token] = useState(getToken )
      const [role] = useState<any>(getRole);*/

  const router = useRouter();

  /*useEffect(() => {
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const tokenUser: any = localStorage.getItem("loginToken");
      setToken(tokenUser);
    }
    /*if (!token) {
          router.push("/");
      }*/
  }, []);

  return (
    <>
      {token && (
        <>
          <div className="bg-greyVivino dark:bg-darkMode-greyVivino  flex flex-row pt-1 mb-0 min-h-screen overflow-x-hidden">
            <MenuDashboard />
            <div className="w-full dark:bg-darkMode-greyVivino ">
              <h1 className="font-plus-jakarta-sans pt-4 text-3xl text-center text-wine font-semibold">
                Mis cajas
              </h1>
              <br></br>
              <div className="flex pt-1 flex-col items-center w-full">
                <hr className="w-full border-gray-300" />
                <br />
                <div className="flex ml-36  items-center w-full">
                  <LabelImportantIcon
                    style={{ color: "#c23a2e" }}
                    className="flex-shrink-0"
                  />
                  <h2 className="font-plus-jakarta-sans text-2xl text-start font-semibold ml-2 dark:text-darkMode-white">
                    Cajas activas
                  </h2>
                </div>
                <br />
                <MapProductCaja />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MisCajas;
