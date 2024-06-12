'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardProducer } from "../dashboardProducer/dashboardProducer";
import { DashboardUser } from "../dashboardUser/dashboardUser";
import { DashboardAdmin } from "../dashboardAdmin/dashboardAdmin";

export const DashboardSelector = () => {
    const pathname = usePathname();
    const [ dataUser, setDataUser ] = useState({
      id: "",
      name: "",
      email: "",
      role: ""
    })
  
    useEffect(() => {
        if( typeof window !== "undefined" && window.localStorage) {
        const storeData = localStorage.getItem("userDataLogin");
        setDataUser(JSON.parse(storeData!));
        }
    }, [pathname])

    return (
      <div className="mx-large mt-small">
        <h1 className="">Hola {dataUser.name}!</h1>
        <div>
          <DashboardProducer />
          {dataUser.role === "1" && (
            <DashboardUser />
          )}
          {dataUser.role === "2" && (
            <DashboardAdmin />
          )}
          {dataUser.role === "3" && (
            <DashboardProducer />
          )}
          {dataUser.role === "4" && (
            <DashboardUser />
          )}
        </div>




      </div>
    )
}

export default DashboardSelector;