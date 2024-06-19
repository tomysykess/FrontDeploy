'use client'
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import React,{ useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import MapProductCaja from "@/components/dashboardJuan/cajaDelMes/mapProductCaja";

const MisCajas: React.FC = (): React.ReactNode => {

    const [token] = useState(localStorage.getItem("loginToken") || null)

    const [role] = useState<any>(localStorage.getItem("userDataLogin") || null);
  
    const router = useRouter()

    useEffect(() => {
      if (!token) {
          router.push("/");
      }
  },[]);

  
   

  return (
        <>
            {token &&(
                 <>
                 <div className="bg-greyVivino flex flex-row pt-1 mb-1 h-screen">
                     <MenuDashboard />
                     <div className="overflow-y-auto w-full">
                         <h1 className="font-plus-jakarta-sans pt-4 text-3xl text-center text-wine font-semibold">Mis cajas</h1><br></br>
                         <div className="flex flex-col items-center w-full">
                             <hr className="w-full border-gray-300" />
                             <br />
                             <div className="flex ml-36  items-center w-full">
                                 <LabelImportantIcon style={{ color: '#c23a2e' }} className="flex-shrink-0" />
                                 <h2 className="font-plus-jakarta-sans text-2xl text-start font-semibold ml-2">Cajas activas</h2>
                             </div>
                             <br />
                             <MapProductCaja/>
                         </div>
                     </div>
                 </div>
             </>
            )}
        </>
  )
};

export default MisCajas;