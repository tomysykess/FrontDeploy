'use client'
//react
import React from "react";
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
  };

  //RENDERIZO UNA CARD POR CADA ELEMENTO DE LA STORE.
  return (
    <>
      {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
      {productsFiltered.map((product: any) => (
        <Link key={product.id} href={`/product/${product.name}`}>
          <p onClick={() => detailProduct(product)}>
            <ProductCard product={product} />
          </p>
        </Link>
      ))}
    </>
  );
};

export default MapProductCardFilterBack;
