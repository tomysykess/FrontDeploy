'use client'
//react
import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/productCard";
import { fetchProductsGin } from "@/utils/getProductsGin";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Product } from "@/interfaces/interfaz";

export const MapProductCardWine: React.FC = (): React.ReactNode => {

  //defino useDispatch para pasarlo como argumento a fetchProducts
  const dispatch = useDispatch();
  const ginProducts = useSelector((state: any) => state.products.ginProducts);

  //GET PRODUCTS A LA API + CARGA DE DATOS EN LA STORE.
  useEffect(() => {
    if (ginProducts.length === 0) {
      fetchProductsGin(dispatch);
    }
  }, [dispatch, ginProducts.length]);

  const detailProduct = (product: Product) => {
    const data = JSON.stringify(product);
    localStorage.setItem("detailProduct", data);
  };

  //RENDERIZO UNA CARD POR CADA ELEMENTO DE LA STORE.
  return (
    <>
      {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
      {ginProducts.map((product: any) => (
        <Link key={product.id} href={`/product/${product.name}`}>
          <p onClick={() => detailProduct(product)}>
            <ProductCard product={product} />
          </p>
        </Link>
      ))}
    </>
  );
};

export default MapProductCardWine;
