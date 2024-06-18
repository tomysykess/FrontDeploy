"use client";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import ProductsAdmin from "@/components/productsAdmin/ProductsAdmin";

import { RootState } from "@/store/store";
import { fetchProducts } from "@/utils/getProducts";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const productosPublicadosAdmin = () => {
  /*   const dispatch = useDispatch(); */
  /* 
  const products = useSelector((state: RootState) => state.products.data); */
  /*  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(dispatch);
    }
  }, [dispatch, products.length]); */
  return (
    <div className="bg-greyVivino flex flex-row pt-1 mb-1">
      <MenuDashboard />
      {/*       <ProductsAdmin products={products}></ProductsAdmin> */}
    </div>
  );
};

export default productosPublicadosAdmin;
