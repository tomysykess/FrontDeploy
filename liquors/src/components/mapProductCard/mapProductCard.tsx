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
  const cajaMes:any  = dataGlobal
  const cajaMes2:any  = JSON.stringify(dataGlobal)
  localStorage.setItem("cajaDelMes", cajaMes2)

  const [page, setPage] = useState();

  //GET PRODUCTS A LA API + CARGA DE DATOS EN LA STORE.
  useEffect(() => {
    if (dataGlobal.length === 0) {
      fetchProductsHome(dispatch, page);
    }
  }, [dispatch, dataGlobal.length]);

  const detailProduct = (product: Product) => {
    const data = JSON.stringify(product);
    localStorage.setItem("detailProduct", data);
  };

  //RENDERIZO UNA CARD POR CADA ELEMENTO DE LA STORE.
  return (
    <>
      {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
      {dataGlobal.map((product: Product) => (
        <p key={product.id}>
          <ProductCard key={product.id} product={product} />
        </p>
      ))}
    </>
  );
};

export default MapProductCard;
