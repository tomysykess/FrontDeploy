'use client'
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import { ProductEdit } from "@/components/productEdit/productEdit";

const EditProductData = ({ params }: { params: { productData: string } }) => {
  const { productData } = params
  const pId = String(productData)
    return (
        <div className="bg-greyVivino flex flex-row pt-1 mb-1 h-screen">
          <MenuDashboard />
            <ProductEdit productId={pId} />
        </div>)
}

export default EditProductData;