import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserDataLogin } from "@/interfaces/interfaz";
import { usePathname } from "next/navigation";
import LockIcon from "@mui/icons-material/Lock";
import Swal from "sweetalert2";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ColorLensIcon from "@mui/icons-material/ColorLens";

export const MenuDashboard: React.FC = (): React.ReactNode => {
  const pathname = usePathname();

  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storeData = localStorage.getItem("userDataLogin");
      setDataUser(JSON.parse(storeData!));
    }
  }, [pathname]);

  //HANDLER PARA RUTAS ROL 1
  const routeHandlerRole1 = () => {
    Swal.fire({
      icon: "info",
      title: "Acceso Denegado",
      text: "Debes ser usuario premium para acceder a esta página",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <>
      <div className="flex h-auto font-plus-jakarta-sans">
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
                <Link
                  href="/profile"
                  className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                >
                  <SettingsIcon />
                  Informacion de la cuenta
                </Link>
                {dataUser.role == "1" && (
                  <>
                    <span
                      onClick={routeHandlerRole1}
                      className="block cursor-pointer py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <LockIcon />
                      Historial de reviews
                    </span>
                    <Link
                      href="/profile/dashboardUser/favoritos"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <FavoriteTwoToneIcon />
                      Favoritos
                    </Link>
                    <span
                      onClick={routeHandlerRole1}
                      className="block cursor-pointer py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <LockIcon />
                      Cajas del mes
                    </span>
                  </>
                )}
                {/*SUPER ADMIN ES ROL 2 -------------------------------------------------------------------------------------------------------------------------------*/}
                {dataUser.role == "2" && (
                  <>
                    <Link
                      href="/profile/dashboardAdmin/historialReviewsAdmin"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <ReviewsIcon />
                      Historial de Todas las reviews
                    </Link>
                    <Link
                      href="/profile/dashboardUser/favoritos"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <FavoriteTwoToneIcon />
                      Los Productos Favoritos
                    </Link>
                    <Link
                      href="/profile/dashboardUser/cajaMes"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <CardGiftcardIcon />
                      Publicar Caja del mes
                    </Link>

                    <Link
                      href="/profile/dashboardAdmin/productosFavoritosAdmin"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <Inventory2Icon></Inventory2Icon>
                      Productos publicados
                    </Link>
                    <Link
                      href="/profile/dashboardAdmin/seleccionarTemaAdmin"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <ColorLensIcon></ColorLensIcon>
                      Seleccionar Tema
                    </Link>
                  </>
                )}{" "}
                {/* ---------------------------------------------------------------------------------------------------------------------------------------- */}
                {dataUser.role == "3" && (
                  <>
                    <Link
                      href="/profile/dashboardProducer/formUser"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      Publicar un producto
                    </Link>
                    <Link
                      href="/profile/dashboardProducer/productosPublicados"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      Productos publicados
                    </Link>
                  </>
                )}
                {dataUser.role == "4" && (
                  <>
                    <Link
                      href="/profile/dashboardUser/historialReviews"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <ReviewsIcon />
                      Historial de reviews
                    </Link>
                    <Link
                      href="/profile/dashboardUser/favoritos"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <FavoriteTwoToneIcon />
                      Favoritos
                    </Link>
                    <Link
                      href="/profile/dashboardUser/cajaMes"
                      className="block py-2 px-6 text-white hover:text-wine hover:bg-greyMLfilter transition duration-300"
                    >
                      <CardGiftcardIcon />
                      Cajas del mes
                    </Link>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};
