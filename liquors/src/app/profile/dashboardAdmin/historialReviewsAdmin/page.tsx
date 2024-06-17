"use client";
import { MapUserHistorialReviews } from "@/components/dashboardJuan/historial de reviews/mapHistoryReview";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

const HistorialReviewsAdmin: React.FC = (): React.ReactNode => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<any>({ rol: "" });
  console.log("rol de dashboardUser", role);

  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    setToken(loginToken);
  }, [token]);

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
            <MenuDashboard />
            <div className=" w-auto">
              <h1 className="font-plus-jakarta-sans pt-5 text-3xl text-center text-wine font-semibold">
                Historial de Todas las reviews
              </h1>
              <div className="flex flex-col items-center w-full">
                <br />
                <hr className="w-full border-gray-300" />
                <div className="flex ml-36 items-center pt-5 w-full">
                  <LabelImportantIcon
                    style={{ color: "#c23a2e" }}
                    className="flex-shrink-0"
                  />
                  <h2 className="font-plus-jakarta-sans  text-2xl text-start font-semibold ml-2">
                    Reviews:
                  </h2>
                </div>
                <br />
                <MapUserHistorialReviews />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HistorialReviewsAdmin;
