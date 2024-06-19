"use client";

import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import ProductsAdmin from "@/components/productsAdmin/ProductsAdmin";
import { RootState } from "@/store/store";
import { fetchProducts } from "@/utils/getProducts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductosPublicadosAdmin = () => {
  const products = useSelector((state: RootState) => state.products.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products && products.length === 0) {
      fetchProducts(dispatch);
    }
  }, []);
  return (
    <div className="bg-greyVivino dark:bg-darkMode-greyVivino flex flex-row pt-1 mb-1">
      <MenuDashboard />
      <ProductsAdmin products={products}></ProductsAdmin>
    </div>
  );
};

export default ProductosPublicadosAdmin;
