"use client";
import { MapUserHistorialReviews } from "@/components/dashboardJuan/historial de reviews/mapHistoryReview";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

const HistorialReviews: React.FC = (): React.ReactNode => {

  const getToken = () => {
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
  const [role] = useState<any>(getRole);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
        router.push("/");
    }
    if (token) {
      const rol = JSON.parse(role)
      if (rol.role =! 4 || rol.role != "4") {
        router.push("/profile")
      }
    }
  },[]);


  /*useEffect(() => {
        if (!token) {
          router.push("/");
        } else {
          const dataLogin: any = localStorage.getItem("userDataLogin");
          const dataLoginParsed = JSON.parse(dataLogin);
          setRole(dataLoginParsed.role);
        } 
    }, [token])*/

    return (
      <>
          {token && (
              <>
                <div className="bg-greyVivino flex flex-row pt-1 mb-1 h-screen">
                    <MenuDashboard/>
                    <div className="overflow-y-auto w-full">
                        <h1 className="font-plus-jakarta-sans pt-4 text-3xl text-center text-wine font-semibold">Reviews</h1><br></br>
                        <div className="flex flex-col items-center w-full">
                            <hr className="w-full border-gray-300" />
                            <br />
                            <div className="flex ml-36 items-center w-full">
                                <LabelImportantIcon style={{ color: '#c23a2e' }} className="flex-shrink-0" />
                                <h2 className="font-plus-jakarta-sans text-2xl text-start font-semibold ml-2">Mis reviews</h2>
                            </div>
                            <br />
                            <MapUserHistorialReviews />
                        </div>
                    </div>
                </div>
              </>
          )}
      </>
)
};

export default HistorialReviews;
