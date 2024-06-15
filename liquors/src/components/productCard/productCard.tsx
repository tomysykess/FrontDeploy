"use client";
import React, { useEffect, useState } from "react";
//material UI
import HalfRating from "../ratingStar/ratingstar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
//interface
import { Product } from "@/interfaces/interfaz";
//utils (logica para color borde top condicional.)
//import { getColorClass } from "@/utils/cardBorderColorDinamic";
import Link from "next/link";
import { postFavorites } from "@/utils/postFavorites";
import { useDispatch } from "react-redux";
import { deleteFavorites } from "@/utils/deteleFavorites";
import { usePathname } from "next/navigation";
import Swal from 'sweetalert2';

const ProductCard: React.FC<{ product: Product}> = ({product}): React.ReactNode => {

  const dispatch =  useDispatch()
  const [favoritColor, setFavoritColor] = useState(false)
  const [userId, setIdUser] = useState<string>()
  

  useEffect(() => {
    const idUser:any = localStorage.getItem("userDataLogin")
    const idUserParsed = JSON.parse(idUser)
    if (idUser) {
      setIdUser(idUserParsed.id)
    }
  },[])
  

  //HANDLER EVENT FAVORITOS
  const favHandler = (product: Product) => {
    const token = localStorage.getItem("loginToken")
    if (token) {
      setFavoritColor((prevFavoritColor) => !prevFavoritColor);
      const productId = product.id;
      if (favoritColor) {
        deleteFavorites(userId, productId, dispatch)
      } else {
      postFavorites(userId, productId);
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Denegado',
        text: 'Debes ser un usario registrado para agregar favoritos.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  //HANDLER DETAIL
  const detailProduct = (product: Product) => {
    const data = JSON.stringify(product)
    localStorage.setItem("detailProduct", data)
   }
  
  return (
    <div
      className={`flex flex-col relative bg-white items-center h-96 border-t-8  rounded-t-xl border-solid border-t-wine border-wine border-2 rounded-lg p-4 m-4 w-48`}>
      <h2 className="text-center text-lg font-Lora mb-2">{product.name}</h2>
      <img
        className="my-2 h-48 w-48 object-cover rounded-md"
        src={product.imgUrl}
        alt="imagen bebida"
      />
      <br></br>
        <div className="flex flex-row absolute bottom-10   pl-1 pr-1 left-0 right-0 items-center justify-between w-full mt-2">
            <span className="text-gray-700">4.5</span>
            <div className="flex flex-row justify-center flex-grow mx-2">
              <HalfRating />
            </div>
            <button onClick={() => favHandler(product)}>
            {favoritColor ? <FavoriteIcon className="text-wineMasOscuro" /> : <FavoriteBorderIcon className="text-wineMasOscuro" />}
            </button>
        </div>
        <div className="flex-grow"></div>
        <Link href={`/product/${product.name}`}>
          <button onClick={() => detailProduct(product)} className="hover:brightness-110 absolute text-start bottom-1 p-1 cursor-pointer font-plus-jakarta-sans rounded-lg bg-wine text-white right-2">detalle</button>
        </Link>
    </div>


  );
};

export default ProductCard;
