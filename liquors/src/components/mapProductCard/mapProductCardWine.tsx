
'use client'
//react
import React, {useEffect, useState} from "react";
import ProductCard from "../productCard/productCard";
import { fetchProductsWine } from "@/utils/getProductsWine";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Product } from "@/interfaces/interfaz";

export const MapProductCardWine: React.FC = (): React.ReactNode => {

 //defino useDispatch para pasarlo como argumento a fetchProducts
 const dispatch = useDispatch()
 const wineProducts = useSelector((state: any) => state.products.wineProducts);
 console.log("vinos de banner vinos", wineProducts);
 

  //GET PRODUCTS A LA API + CARGA DE DATOS EN LA STORE.
  useEffect(() => {
    if (wineProducts.length === 0) {
      fetchProductsWine(dispatch);
    }
  }, [dispatch, wineProducts.length]);

 const detailProduct = (product: Product) => {
  const data = JSON.stringify(product)
  localStorage.setItem("detailProduct", data)
 }
 const activeProducts = wineProducts.filter((product: Product) => product.active);


  //RENDERIZO UNA CARD POR CADA ELEMENTO DE LA STORE.
  return (
      <>
          {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
            {activeProducts.map((product:any) => (
             
                <p key={product.id}>
                  <ProductCard key={product.id} product={product} />
                </p>
             
            ))}
      </>
  );
};

export default  MapProductCardWine;