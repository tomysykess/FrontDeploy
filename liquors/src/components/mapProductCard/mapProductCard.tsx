"use client";
//react
import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/productCard";
import { fetchProductsHome } from "@/utils/getProductsHome";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Product } from "@/interfaces/interfaz";
import { RootState } from "@/store/store";

export const MapProductCard: React.FC = (): React.ReactNode => {
  //defino useDispatch para pasarlo como argumento a fetchProducts
  const dispatch = useDispatch();
  const dataGlobal = useSelector((state: RootState) => state.products.data);
  console.log(dataGlobal);
 
  const [page, setPage] = useState();

  //GET PRODUCTS A LA API + CARGA DE DATOS EN LA STORE.
  useEffect(() => {
    if (dataGlobal.length === 0) {
      fetchProductsHome(dispatch, page);
    }
  }, [dispatch, dataGlobal.length]);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Verifica que estamos en el navegador
      const cajaMes2 = JSON.stringify(dataGlobal);
      localStorage.setItem("cajaDelMes", cajaMes2);
    }
  }, [dataGlobal]);

  const detailProduct = (product: Product) => {
    const data = JSON.stringify(product);
    localStorage.setItem("detailProduct", data);
  };

  const activeProducts = dataGlobal.filter((product: Product) => product.active);


  //RENDERIZO UNA CARD POR CADA ELEMENTO DE LA STORE.
  return (
    <>
      {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
      {activeProducts.map((product: Product) => (

        <p key={product.id}>
          <ProductCard key={product.id} product={product} />
        </p>
      ))}
    </>
  );
};

export default MapProductCard;
