"use client";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import { ProductsListAdmin } from "@/components/productsListAdmin/productsListAdmin";
import { ProductsListSeller } from "@/components/productsListSeller/productsListSeller";

const productosPublicados = () => {
  return (
    <div className="bg-greyVivino flex flex-row pt-1 mb-1 h-screen">
      <MenuDashboard />
      {/* <ProductsListSeller /> */}
      <ProductsListAdmin />
    </div>
  );
};

export default productosPublicados;
