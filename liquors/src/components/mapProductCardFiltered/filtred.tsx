
'use client'
//react
import React, {useEffect, useState} from "react";
import ProductCard from "../productCard/productCard";
import { useSelector } from "react-redux";

const MapProductCardFiltered = () => {
  const dataGlobal = useSelector((state: any) => state.products.data);
  const [productFiltered, setProductFiltered] = useState('');

  useEffect(() => {
      const data: any = localStorage.getItem("itemCategory");
      const parse = JSON.parse(data);
      setProductFiltered(parse?.item || '');
  }, []);

  console.log(productFiltered);
  

  return (
      <>
          {dataGlobal.map((product: any) => (
            product.name.toLowerCase().includes(productFiltered.toLowerCase()) && 
                <ProductCard key={product.id} product={product} />
    ))}
      </>
  );
};

export default MapProductCardFiltered;