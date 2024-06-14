import React,{useState, useEffect} from "react";
import Link from "next/link";
import { UserDataLogin } from "@/interfaces/interfaz";
import { usePathname } from "next/navigation";
export const MenuDashboard: React.FC = (): React.ReactNode => {
    
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
        <>
            <div className="flex h-screen font-plus-jakarta-sans">
                    {/* Barra lateral */}
                    <aside className="bg-wine w-64 flex-shrink-0">
                        <div className="h-full flex flex-col justify-between pt-4">
                            {/* Logo o título */}
                            <div className="py-4 px-6">
                                <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                            </div>
                            <hr></hr>
                            {/* Navegación */}
                            <nav className="flex-1 pt-6">
                                <ul className="space-y-2">

                                    <Link href="/profile" className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300">Informacion de la cuenta</Link>
                                    {dataUser.role == "1" && (
                                        <Link href="/profile/dashboardUser/favoritos" className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300">Favoritos</Link>  
                                    )}
                                    {/*SUPER ADMIN ES ROL 2 */}
                                    {dataUser.role == "2" && (
                                          "aca va lo del superadmin"
                                    )}
                                    {dataUser.role == "3" && (
                                        <>
                                            <Link href="/profile/dashboardProducer/productForm" className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300">Publicar un producto</Link>
                                            <Link href="/profile/productosPublicados" className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300">Productos publicados</Link>
                                        </>
                                    )}
                                    {dataUser.role == "4" && (
                                        <>
                                           <Link href="/profile/dashboardUser/historialReviews" className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300">Historial de reviews</Link>  
                                           <Link href="/profile/dashboardUser/favoritos" className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300">Favoritos</Link>  
                                           <Link href="/profile/dashboardUser/cajaMes" className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300">Cajas del mes</Link>  
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </aside>
            </div>

        </>
    )

}