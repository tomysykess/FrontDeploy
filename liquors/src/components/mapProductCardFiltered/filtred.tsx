
'use client'
//react
import React, {useEffect, useState} from "react";
import ProductCard from "../productCard/productCard";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const MapProductCardFiltered = () => {

  const dataGlobal = useSelector((state: any) => state.products.data);
  const [productFiltered, setProductFiltered] = useState('');
  const router = useRouter()

  useEffect(() => {
      const data: any = localStorage.getItem("itemCategory");
      const parse = JSON.parse(data);
      setProductFiltered(parse?.item || '');
  }, []);

  console.log(productFiltered);

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
    product.name.toLowerCase().includes(productFiltered.toLowerCase())
  );

  return (
    <>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        showNoResultsAlert()
      )}
    </>
  );
};

export default MapProductCardFiltered;