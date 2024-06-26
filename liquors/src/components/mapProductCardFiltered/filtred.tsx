
'use client'
// react
import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/productCard";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const MapProductCardFiltered = () => {
  const dataGlobal = useSelector((state: any) => state.products.data || []);
  const [productFiltered, setProductFiltered] = useState('');
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("itemCategory");
    if (data) {
      const parse = JSON.parse(data);
      setProductFiltered(parse?.item || '');
    }
  }, []);

  const showNoResultsAlert = () => {
    Swal.fire({
      icon: 'info',
      title: 'No se encontraron resultados para tu búsqueda',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Volver',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/product');
      }
    });
  };

  const filteredProducts = dataGlobal.filter((product: any) =>
    product.active && product.name.toLowerCase().includes(productFiltered.toLowerCase())
  );

  useEffect(() => {
    if (filteredProducts.length === 0) {
      showNoResultsAlert();
    }
  }, [filteredProducts]);



  return (
    <>
      {filteredProducts.length > 0 && (
        filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </>
  );
};

export default MapProductCardFiltered;