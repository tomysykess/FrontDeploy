
'use client'
//react
import React, {useEffect, useState} from "react";
import ProductCard from "../productCard/productCard";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Product } from "@/interfaces/interfaz";

export const MapProductCardFilterBack: React.FC = (): React.ReactNode => {

  //defino useDispatch para pasarlo como argumento a fetchProducts
  const productsFiltered: any = useSelector((state: any) => state.products.dataFiltered);
  console.log("productos filtrados del back", productsFiltered);
  

  const detailProduct = (product: Product) => {
    const data = JSON.stringify(product)
    localStorage.setItem("detailProduct", data)
   }  

  //RENDERIZO UNA CARD POR CADA ELEMENTO DE LA STORE.
  return (
      <>
          {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
            {productsFiltered.map((product:any) => (
             <p key={product.id}>
                  <ProductCard key={product.id} product={product} />
              </p>
            ))}
      </>
  );
};

export default  MapProductCardFilterBack;