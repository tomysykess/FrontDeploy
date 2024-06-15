import axios from "axios";
import { AppDispatch } from "@/store/store";

import {
  clearReviews,
  readReviews,
  removeReview,
  updateReviews,
} from "@/store/reducers/reviewsSlice";
import { IReview } from "@/interfaces/interfaz";
import { Dispatch } from "@reduxjs/toolkit";

import Swal from "sweetalert2";
import { fetchReviews } from "./getReviews";

export const deleteReview = async (reviewId: string, dispatch: AppDispatch) => {
  const detailProduct = localStorage.getItem("detailProduct");
  const userDataLogin = localStorage.getItem("userDataLogin");
  if (detailProduct && userDataLogin) {
    const idProduct = JSON.parse(detailProduct);
    const idUser = JSON.parse(userDataLogin);
    const idP = idProduct.id;
    const idU = idUser.id;
    const token = idUser.token;
    const url = `https://liquors-project.onrender.com/reviews/delete/${reviewId}`;

    try {
      const res = await axios.put(
        url,
        {},
        {
          headers: {
            authorization: `Bearer: ${token}`,
          },
        }
      );
      console.log("respuesta de back al delete", res);
      dispatch(removeReview(reviewId));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Favorito eliminado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("error al borrar review", error);

      throw new Error("Error eliminando la review");
    }
  }
};

export const editReview = async (
  id: string,
  dispatch: Dispatch,
  reviewEdited: any
) => {
  try {
    const detailProduct = localStorage.getItem("detailProduct");
    const userDataLogin = localStorage.getItem("userDataLogin");
    const { rate, comment } = reviewEdited;
    const data = {
      rate: Number(rate),
      comment: comment,
    };

    if (detailProduct && userDataLogin) {
      const idUser = JSON.parse(userDataLogin);
      const token = idUser.token;
      console.log("ESTE ES EL OBJETO QUE ESTOY MANDANDO POR EL PUT", data);
      const response = await axios.put(
        `https://liquors-project.onrender.com/reviews/${id}`,
        data,
        {
          headers: {
            authorization: `Bearer: ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateReviews(reviewEdited));
        clearReviews();
        fetchReviews(dispatch);
      } else {
        throw new Error("Error en la actualización de la reseña");
      }
    } else {
      throw new Error(
        "Datos de producto o usuario no encontrados en el almacenamiento local"
      );
    }
  } catch (error) {
    console.error("Error editando la reseña:", error);
    throw new Error("Hubo un error editando la reseña.");
  }
};
