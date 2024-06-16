'use client'
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import { ProductsListSeller } from "@/components/productsListSeller/productsListSeller";

const productosPublicados = () => {
    return <div className="bg-greyVivino flex flex-row pt-1 mb-1">
    <MenuDashboard />
    <ProductsListSeller />
    </div>
};

export default productosPublicados;